import configService from '@/config/config.service';
import axios, { CreateAxiosDefaults } from 'axios';

const axiosOptions: CreateAxiosDefaults = {
	baseURL: configService.get('app').api_url,
	headers:{
		'Content-Type': 'application/json',
	}
}

export const instance = axios.create(axiosOptions)