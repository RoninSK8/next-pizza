import { Story, StoryItem } from '@prisma/client';
import { axiosInstance } from './instance';

export type IStory = Story & {
	items: StoryItem[];
};

export const getAll = async (): Promise<IStory[]> => {
	const { data } = await axiosInstance.get<IStory[]>('/stories');
	return data;
};
