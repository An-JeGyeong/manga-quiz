export const GA_MEASUREMENT_ID = 'G-0LG099MZNY'

type GtagEventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (command: 'config' | 'event' | 'js' | 'set', target: string | Date, params?: GtagEventParams) => void
  }
}

function sendEvent(action: string, params?: GtagEventParams) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, params)
}

export function trackQuizStart() {
  sendEvent('quiz_start')
}

export function trackQuizComplete(resultType: string) {
  sendEvent('quiz_complete', { result_type: resultType })
}

export function trackResultShare(shareMethod: string) {
  sendEvent('result_share', { share_method: shareMethod })
}

export function trackWorkClick(workTitle: string) {
  sendEvent('work_click', { work_title: workTitle })
}

export function trackWorkFeedback(workTitle: string, feedback: 'good' | 'bad') {
  sendEvent('work_feedback', { work_title: workTitle, feedback })
}

export function trackQuizAbandon(
  step: number,
  questionId: number,
  timeSpentSeconds: number,
  questionTimeSpentSeconds: number,
) {
  sendEvent('quiz_abandon', {
    step,
    question_id: questionId,
    time_spent_seconds: timeSpentSeconds,
    question_time_spent: questionTimeSpentSeconds,
  })
}

export function trackQuizSkip(step: number, questionId: number, questionTimeSpentSeconds: number) {
  sendEvent('quiz_skip', {
    step,
    question_id: questionId,
    question_time_spent: questionTimeSpentSeconds,
  })
}
