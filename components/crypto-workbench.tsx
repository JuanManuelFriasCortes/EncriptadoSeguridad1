'use client';

import { useMemo, useState } from 'react';
import { Check, Clipboard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  analyzeCiphertext,
  atbashTransform,
  caesarEncrypt,
  LIMITS,
  normalizeShift,
  toGraphemes,
  validateCharset,
  validateMessage,
} from '@/lib/crypto/index.js';

type CipherMethod = 'caesar' | 'atbash';
type AutomaticResult = ReturnType<typeof analyzeCiphertext>;

const DEFAULT_CHARSET = [
  'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
  'abcdefghijklmnñopqrstuvwxyz',
  'ÁÉÍÓÚÜáéíóúü',
  '0123456789',
  '.,;:!?¿¡()[]{}+-=*/_%@#&$',
].join('');

function ErrorNotice({ messages }: { messages: string[] }) {
  if (messages.length === 0) return null;

  return (
    <p className="text-sm text-destructive" role="alert" aria-live="assertive">
      {messages.join(' ')}
    </p>
  );
}

function CharacterCount({ value }: { value: string }) {
  const count = toGraphemes(value).length;
  return (
    <span className={count > LIMITS.maxMessageLength ? 'text-destructive' : ''}>
      {count.toLocaleString('es-MX')} / {LIMITS.maxMessageLength.toLocaleString('es-MX')}
    </span>
  );
}

export function CryptoWorkbench() {
  const [charset, setCharset] = useState<string>(DEFAULT_CHARSET);
  const [plainText, setPlainText] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [method, setMethod] = useState<CipherMethod>('caesar');
  const [shift, setShift] = useState('3');
  const [encrypted, setEncrypted] = useState('');
  const [encryptedMeta, setEncryptedMeta] = useState('');
  const [automaticResult, setAutomaticResult] = useState<AutomaticResult | null>(null);
  const [encryptErrors, setEncryptErrors] = useState<string[]>([]);
  const [decryptErrors, setDecryptErrors] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const charsetValidation = useMemo(() => validateCharset(charset), [charset]);
  const charsetCount = charsetValidation.characters.length;

  function encryptMessage() {
    const messageValidation = validateMessage(plainText);
    const errors = [...charsetValidation.errors, ...messageValidation.errors];

    if (method === 'caesar' && !/^-?\d+$/u.test(shift.trim())) {
      errors.push('El desplazamiento César debe ser un número entero.');
    }

    const numericShift = Number(shift);
    if (method === 'caesar' && !Number.isSafeInteger(numericShift)) {
      errors.push('El desplazamiento César está fuera del rango seguro.');
    }

    if (errors.length > 0) {
      setEncryptErrors([...new Set(errors)]);
      setEncrypted('');
      return;
    }

    const result = method === 'caesar'
      ? caesarEncrypt(messageValidation.normalized, charsetValidation.characters, numericShift)
      : atbashTransform(messageValidation.normalized, charsetValidation.characters);

    setEncrypted(result);
    setEncryptedMeta(
      method === 'caesar'
        ? `César · desplazamiento normalizado ${normalizeShift(numericShift, charsetCount)}`
        : 'Atbash · sustitución inversa',
    );
    setEncryptErrors([]);
    setCopyState('idle');
  }

  function decryptAutomatically() {
    try {
      const result = analyzeCiphertext(ciphertext, charset);
      setAutomaticResult(result);
      setDecryptErrors([]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No fue posible analizar el mensaje.';
      setAutomaticResult(null);
      setDecryptErrors([message]);
    }
  }

  async function copyEncrypted() {
    if (!encrypted) return;
    try {
      await navigator.clipboard.writeText(encrypted);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  }

  const confidenceLabel = automaticResult
    ? `${automaticResult.confidence.level.charAt(0).toUpperCase()}${automaticResult.confidence.level.slice(1)} (${automaticResult.confidence.percentage}%)`
    : '';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 sm:py-12">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold sm:text-3xl">Cifrado César y Atbash</h1>
        </header>

        <section aria-labelledby="charset-title" className="pb-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 id="charset-title" className="text-lg font-semibold">Conjunto de caracteres</h2>
            <span className={charsetValidation.valid ? 'font-mono text-xs text-muted-foreground' : 'font-mono text-xs text-destructive'}>
              {charsetCount} / {LIMITS.maxCharsetLength}
            </span>
          </div>
          <Label htmlFor="charset" className="mb-2">Caracteres disponibles</Label>
          <Textarea
            id="charset"
            className="min-h-24 resize-y bg-card px-3 py-2.5 font-mono"
            value={charset}
            onChange={(event) => {
              setCharset(event.target.value);
              setEncrypted('');
              setAutomaticResult(null);
            }}
            aria-describedby="charset-error"
            aria-invalid={!charsetValidation.valid}
            spellCheck={false}
            autoComplete="off"
          />
          {!charsetValidation.valid && (
            <p id="charset-error" className="mt-2 text-sm text-destructive" role="alert">
              {charsetValidation.errors.join(' ')}
            </p>
          )}
        </section>

        <section aria-labelledby="encrypt-title" className="border-t border-border py-10">
          <h2 id="encrypt-title" className="mb-6 text-lg font-semibold">Cifrar</h2>
          <div className="grid gap-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <Label htmlFor="plain-text">Texto</Label>
                <span className="font-mono text-xs text-muted-foreground"><CharacterCount value={plainText} /></span>
              </div>
              <Textarea
                id="plain-text"
                className="min-h-36 resize-y bg-card px-3 py-2.5"
                value={plainText}
                onChange={(event) => {
                  setPlainText(event.target.value);
                  setEncryptErrors([]);
                }}
                placeholder="Escribe el texto que deseas cifrar"
                spellCheck="false"
              />
            </div>

            <div className={method === 'caesar' ? 'grid gap-5 sm:grid-cols-2' : 'grid gap-5'}>
              <fieldset className="sm:max-w-md">
                <legend className="mb-2 text-sm font-medium">Método</legend>
                <div className="grid h-10 grid-cols-2 overflow-hidden rounded-md border border-input bg-card" role="radiogroup">
                  {(['caesar', 'atbash'] as const).map((value) => (
                    <label key={value} className="relative cursor-pointer text-center text-sm">
                      <input
                        className="peer sr-only"
                        type="radio"
                        name="cipher-method"
                        value={value}
                        checked={method === value}
                        onChange={() => setMethod(value)}
                      />
                      <span className={`grid h-full place-items-center peer-checked:bg-secondary peer-checked:font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-inset ${value === 'caesar' ? 'border-r border-input' : ''}`}>
                        {value === 'caesar' ? 'César' : 'Atbash'}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {method === 'caesar' && (
                <div>
                  <Label htmlFor="shift" className="mb-2">Desplazamiento</Label>
                  <Input
                    id="shift"
                    className="h-10 bg-card px-3"
                    type="number"
                    step="1"
                    value={shift}
                    onChange={(event) => setShift(event.target.value)}
                    inputMode="numeric"
                  />
                </div>
              )}
            </div>

            <ErrorNotice messages={encryptErrors.filter((message) => !charsetValidation.errors.includes(message))} />
            <div>
              <Button type="button" size="lg" className="h-10 px-5" onClick={encryptMessage}>
                Cifrar
              </Button>
            </div>

            <output className="min-h-32 rounded-md border border-border bg-card p-4" aria-live="polite">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <span className="block text-sm font-medium">Resultado</span>
                  {encryptedMeta && <span className="mt-1 block text-xs text-muted-foreground">{encryptedMeta}</span>}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-24"
                  aria-label="Copiar resultado cifrado"
                  title="Copiar resultado"
                  onClick={copyEncrypted}
                  disabled={!encrypted}
                >
                  {copyState === 'copied' ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
                  {copyState === 'copied' ? 'Copiado' : 'Copiar'}
                </Button>
              </div>
              <p className={encrypted ? 'break-words whitespace-pre-wrap font-mono text-sm' : 'font-mono text-sm text-muted-foreground'}>
                {encrypted || 'Sin resultado.'}
              </p>
              {copyState === 'error' && <p className="mt-2 text-sm text-destructive">El navegador no permitió copiar el resultado.</p>}
            </output>
          </div>
        </section>

        <section aria-labelledby="decrypt-title" className="border-t border-border pt-10">
          <h2 id="decrypt-title" className="mb-6 text-lg font-semibold">Descifrar</h2>
          <div className="grid gap-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <Label htmlFor="cipher-text">Mensaje cifrado</Label>
                <span className="font-mono text-xs text-muted-foreground"><CharacterCount value={ciphertext} /></span>
              </div>
              <Textarea
                id="cipher-text"
                className="min-h-36 resize-y bg-card px-3 py-2.5"
                value={ciphertext}
                onChange={(event) => {
                  setCiphertext(event.target.value);
                  setDecryptErrors([]);
                }}
                placeholder="Pega el mensaje que deseas descifrar"
                spellCheck="false"
              />
            </div>

            <ErrorNotice messages={decryptErrors.filter((message) => !charsetValidation.errors.includes(message))} />
            <div>
              <Button type="button" size="lg" className="h-10 px-5" onClick={decryptAutomatically}>
                Descifrar automáticamente
              </Button>
            </div>

            <output className="min-h-40 rounded-md border border-border bg-card p-4" aria-live="polite" aria-atomic="true">
              <span className="block text-sm font-medium">Texto descifrado</span>
              <p className={automaticResult ? 'mt-3 break-words whitespace-pre-wrap font-mono text-sm' : 'mt-3 text-sm text-muted-foreground'}>
                {automaticResult?.plaintext ?? 'Sin resultado.'}
              </p>
              {automaticResult && (
                <dl className="mt-5 grid gap-2 border-t border-border pt-4 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Método detectado:</dt>
                    <dd className="font-medium">{automaticResult.algorithm === 'caesar' ? 'César' : 'Atbash'}</dd>
                  </div>
                  {automaticResult.algorithm === 'caesar' && (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Desplazamiento:</dt>
                      <dd className="font-medium">{automaticResult.shift}</dd>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Confianza:</dt>
                    <dd className="font-medium">{confidenceLabel}</dd>
                  </div>
                </dl>
              )}
            </output>
          </div>
        </section>
      </div>
    </main>
  );
}
