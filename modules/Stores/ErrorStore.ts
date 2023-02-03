import { makeAutoObservable } from "mobx"
export class Error {
    id: number;
    message: string;
    severity: string;
    duration: number // ms

    constructor(error: any) {
        this.id = Math.random()
        this.message = error.message
        this.severity =  error.severity
        this.duration = error.duration
        makeAutoObservable(this)
    }
}

export class ErrorStore {
    activeErrors: Error[]
    archivedErrors: Error[]

    constructor() {
        this.activeErrors = []
        this.archivedErrors = []
        makeAutoObservable(this)
    }

    public get activeError(){
        return this.activeErrors.slice()[0]
    }

    public addError(message: string, severity: string, duration?: number) {
        const error = new Error({
            message: message,
            severity: severity,
            duration: duration || 6000,
        })
        this.activeErrors.push(error)
    }

    public deactivateError() {
        const shownError = this.activeErrors.shift()

        if (shownError) {
            this.archivedErrors.push(shownError)
        }
    }
}
