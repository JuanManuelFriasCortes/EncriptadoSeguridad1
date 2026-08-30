'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Braces,
  Check,
  Clipboard,
  KeyRound,
  LockKeyholeOpen,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  analyzeCiphertext,
  atbashTransform,
  caesarEncrypt,
  CHARSET_PRESETS,
  LIMITS,
  normalizeShift,
  toGraphemes,
  validateCharset,
  validateMessage,
} from '@/lib/crypto/index.js';

type CipherMethod = 'caesar' | 'atbash';
type AutomaticResult = ReturnType<typeof analyzeCiphertext>;

const PRESETS = [
  { key: 'spanish', label: 'Español', value: CHARSET_PRESETS.spanish },
  { key: 'alphanumeric', label: 'Letras + números', value: CHARSET_PRESETS.alphanumeric },
  { key: 'lowercase', label: 'Minúsculas', value: CHARSET_PRESETS.lowercase },
  { key: 'emoji', label: 'Emojis', value: CHARSET_PRESETS.emoji },
] as const;

function ErrorNotice({ messages }: { messages: string[] }) {
  if (messages.length === 0) return null;

  return (
    <Alert variant="destructive" className="rounded-md" aria-live="assertive">
      <TriangleAlert aria-hidden="true" />
      <AlertDescription>{messages.join(' ')}</AlertDescription>
    </Alert>
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
  const [charset, setCharset] = useState<string>(CHARSET_PRESETS.spanish);
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

  function selectPreset(value: string) {
    setCharset(value);
    setEncryptErrors([]);
    setDecryptErrors([]);
    setEncrypted('');
    setAutomaticResult(null);
  }

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
    ? `${automaticResult.confidence.level} · ${automaticResult.confidence.percentage}%`
    : 'Sin analizar';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[var(--header)]">
        <div className="mx-auto flex max-w-[1440px] items-start justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-[var(--accent-strong)]">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Laboratorio de criptografía clásica
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">Criptoanálisis Al-Kindi</h1>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
              Herramienta educativa para estudiar César, Atbash y criptoanálisis estadístico inspirado en Al-Kindi.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-md border border-[var(--privacy-border)] bg-[var(--privacy-bg)] px-3 py-2 text-xs text-[var(--privacy-text)] md:flex">
            <LockKeyholeOpen className="size-4" aria-hidden="true" />
            Procesamiento local, sin envíos ni almacenamiento
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <section aria-labelledby="charset-title" className="border-b border-border pb-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <Label id="charset-title" htmlFor="charset">
                  <Braces className="size-4 text-[var(--accent-strong)]" aria-hidden="true" />
                  Conjunto ordenado de caracteres
                </Label>
                <span className={charsetValidation.valid ? 'font-mono text-xs text-muted-foreground' : 'font-mono text-xs text-destructive'}>
                  {charsetCount} / {LIMITS.maxCharsetLength}
                </span>
              </div>
              <Input
                id="charset"
                className="h-10 font-mono"
                value={charset}
                onChange={(event) => {
                  setCharset(event.target.value);
                  setEncrypted('');
                  setAutomaticResult(null);
                }}
                aria-describedby="charset-help charset-error"
                aria-invalid={!charsetValidation.valid}
                spellCheck={false}
                autoComplete="off"
              />
              <p id="charset-help" className="mt-2 text-xs text-muted-foreground">
                NFC · sin espacios ni duplicados · los caracteres externos permanecen intactos
              </p>
              {!charsetValidation.valid && (
                <p id="charset-error" className="mt-2 text-xs text-destructive" role="alert">
                  {charsetValidation.errors.join(' ')}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Conjuntos sugeridos">
              {PRESETS.map((preset) => (
                <Button
                  key={preset.key}
                  type="button"
                  size="sm"
                  variant={charset === preset.value ? 'secondary' : 'outline'}
                  onClick={() => selectPreset(preset.value)}
                >
                  {charset === preset.value && <Check aria-hidden="true" />}
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <div className="grid min-h-[560px] lg:grid-cols-2">
          <section aria-labelledby="encrypt-title" className="border-b border-border py-6 lg:border-r lg:border-b-0 lg:pr-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md bg-[var(--encrypt-bg)] text-[var(--encrypt-text)]">
                <KeyRound className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Herramienta 01</p>
                <h2 id="encrypt-title" className="text-lg font-bold">Cifrar mensaje</h2>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label htmlFor="plain-text">Texto original</Label>
                  <span className="font-mono text-xs text-muted-foreground"><CharacterCount value={plainText} /></span>
                </div>
                <Textarea
                  id="plain-text"
                  className="min-h-32 resize-y"
                  value={plainText}
                  onChange={(event) => {
                    setPlainText(event.target.value);
                    setEncryptErrors([]);
                  }}
                  placeholder="Escribe el mensaje que deseas cifrar..."
                  spellCheck="false"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <fieldset>
                  <legend className="mb-2 text-sm font-medium">Método</legend>
                  <div className="grid h-8 grid-cols-2 overflow-hidden rounded-md border border-input" role="radiogroup">
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
                        <span className="grid h-full place-items-center border-r border-input transition-colors last:border-0 peer-checked:bg-secondary peer-checked:font-semibold peer-checked:text-secondary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-inset">
                          {value === 'caesar' ? 'César' : 'Atbash'}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className={method === 'caesar' ? '' : 'invisible'} aria-hidden={method !== 'caesar'}>
                  <Label htmlFor="shift" className="mb-2">Desplazamiento</Label>
                  <Input
                    id="shift"
                    type="number"
                    step="1"
                    value={shift}
                    disabled={method !== 'caesar'}
                    onChange={(event) => setShift(event.target.value)}
                    inputMode="numeric"
                  />
                </div>
              </div>

              <ErrorNotice messages={encryptErrors} />
              <Button type="button" size="lg" className="h-10 w-full bg-[var(--encrypt-text)] hover:bg-[var(--encrypt-text)]/85" onClick={encryptMessage}>
                Cifrar
                <ArrowRight aria-hidden="true" />
              </Button>

              <output className="min-h-32 border-l-2 border-border bg-muted/45 p-4" aria-live="polite">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-xs font-semibold uppercase text-muted-foreground">Resultado cifrado</span>
                    {encryptedMeta && <span className="mt-1 block text-xs text-muted-foreground">{encryptedMeta}</span>}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Copiar resultado cifrado"
                    title="Copiar resultado"
                    onClick={copyEncrypted}
                    disabled={!encrypted}
                  >
                    {copyState === 'copied' ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
                  </Button>
                </div>
                <p className={encrypted ? 'break-words whitespace-pre-wrap font-mono text-sm' : 'font-mono text-sm text-muted-foreground'}>
                  {encrypted || 'El resultado aparecerá aquí.'}
                </p>
                {copyState === 'error' && <p className="mt-2 text-xs text-destructive">El navegador no permitió copiar el resultado.</p>}
              </output>
            </div>
          </section>

          <section aria-labelledby="decrypt-title" className="py-6 lg:pl-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md bg-[var(--analysis-bg)] text-[var(--analysis-text)]">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Herramienta 02</p>
                <h2 id="decrypt-title" className="text-lg font-bold">Descifrado automático</h2>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label htmlFor="cipher-text">Texto cifrado</Label>
                  <span className="font-mono text-xs text-muted-foreground"><CharacterCount value={ciphertext} /></span>
                </div>
                <Textarea
                  id="cipher-text"
                  className="min-h-32 resize-y"
                  value={ciphertext}
                  onChange={(event) => {
                    setCiphertext(event.target.value);
                    setDecryptErrors([]);
                  }}
                  placeholder="Pega un mensaje cifrado con César o Atbash..."
                  spellCheck="false"
                />
              </div>

              <ErrorNotice messages={decryptErrors} />
              <Button type="button" size="lg" className="h-10 w-full" onClick={decryptAutomatically}>
                Analizar y descifrar
                <ShieldCheck aria-hidden="true" />
              </Button>

              <output className="min-h-[204px] border-l-2 border-[var(--accent-strong)] bg-[var(--analysis-surface)] p-4" aria-live="polite" aria-atomic="true">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <span className="block text-xs font-semibold uppercase text-[var(--accent-strong)]">Resultado seleccionado</span>
                    {automaticResult && (
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {automaticResult.algorithm === 'caesar'
                          ? `César · desplazamiento ${automaticResult.shift}`
                          : 'Atbash'}
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 rounded-sm border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
                    Confianza {confidenceLabel}
                  </span>
                </div>
                <p className={automaticResult ? 'break-words whitespace-pre-wrap font-mono text-sm' : 'text-sm text-muted-foreground'}>
                  {automaticResult?.plaintext ?? 'El sistema comparará Atbash con todos los desplazamientos César y mostrará una única respuesta.'}
                </p>
              </output>

              <div className="grid grid-cols-3 border-y border-border py-3 text-center text-xs text-muted-foreground" aria-label="Señales estadísticas aplicadas">
                <span>Frecuencias</span>
                <span className="border-x border-border">Chi-cuadrada</span>
                <span>N-gramas</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="grid gap-2 border-t border-border py-4 text-xs text-muted-foreground md:grid-cols-2">
          <p>
            <strong className="text-foreground">Privacidad:</strong> los mensajes se procesan únicamente en memoria y no se envían a ningún servidor.
          </p>
          <p className="md:text-right">
            <strong className="text-foreground">Aviso:</strong> César y Atbash no proporcionan seguridad moderna y no deben proteger información sensible.
          </p>
        </footer>
      </div>
    </main>
  );
}
