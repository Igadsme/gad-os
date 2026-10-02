import { useCallback, useEffect, useRef, useState } from 'react'

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  continuous: boolean
  start: () => void
  abort: () => void
  onstart: (() => void) | null
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && getSpeechRecognition() !== null
}

export function useSpeechRecognition() {
  const [supported] = useState(() => isSpeechRecognitionSupported())
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  const stop = useCallback(() => {
    const recognition = recognitionRef.current
    recognitionRef.current = null
    if (recognition) {
      recognition.onend = null
      recognition.onerror = null
      recognition.abort()
    }
    setListening(false)
  }, [])

  const start = useCallback(() => {
    const previous = recognitionRef.current
    recognitionRef.current = null
    if (previous) {
      previous.onend = null
      previous.onerror = null
      previous.abort()
    }
    setListening(false)
    setTranscript('')
    setError(null)
    if (!supported) {
      setError('Voice input is not supported in this browser.')
      return
    }

    const Recognition = getSpeechRecognition()
    if (!Recognition) {
      setError('Voice input is not supported in this browser.')
      return
    }

    const recognition = new Recognition()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.continuous = true
    recognitionRef.current = recognition

    recognition.onresult = (event) => {
      let combined = ''
      for (let i = 0; i < event.results.length; i += 1) {
        combined += event.results[i][0].transcript
      }
      setTranscript(combined.trim())
    }
    recognition.onerror = (event) => {
      setListening(false)
      setError(
        event.error === 'not-allowed'
          ? 'Microphone permission was denied.'
          : 'Voice input stopped unexpectedly. Please try again.',
      )
    }
    recognition.onend = () => setListening(false)
    recognition.onstart = () => setListening(true)

    try {
      recognition.start()
    } catch {
      recognitionRef.current = null
      setError('Could not start the microphone. Check browser permissions and try again.')
    }
  }, [supported])

  useEffect(
    () => () => {
      const recognition = recognitionRef.current
      recognitionRef.current = null
      if (recognition) {
        recognition.onend = null
        recognition.onerror = null
        recognition.abort()
      }
    },
    [],
  )

  return {
    supported,
    listening,
    transcript,
    error,
    start,
    stop,
  }
}
