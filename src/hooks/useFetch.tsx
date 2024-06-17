class useFetch {
	private readonly link: string
	constructor(link: string) {
		this.link = link
	}
	
	async getData() {
		try {
			const response = await fetch(this.link, {method: "GET"})
			if (!response) {
				throw new Error(`HTTP error! Status: ${response}`)
			} else {
				return await response.json()
			}
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}
}

export { useFetch };