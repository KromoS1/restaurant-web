const config = {
	app: {
		api_url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
	},
}

type ConfType = typeof config

class ConfigService {
	public get<K extends keyof ConfType>(key: K): ConfType[K] {
		return config[key]
	}
}

export default new ConfigService()
