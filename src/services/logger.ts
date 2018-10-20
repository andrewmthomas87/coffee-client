
class Logger {

	public error(message: any) {
		console.error(`[ERROR]  ${message}`)
	}

	public warning(message: any) {
		console.warn(`[WARN]   ${message}`)
	}

	public info(message: any) {
		console.log(`[INFO]   ${message}`)
	}

	public debug(message: any) {
		console.debug(`[DEBUG]  ${message}`)
	}

	public trace(message: any) {
		console.trace(`[TRACE]  ${message}`)
	}

}

export default new Logger()
