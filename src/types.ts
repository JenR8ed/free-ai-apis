export type AuthType = 'apiKey' | 'OAuth' | 'None';

export type CategoryKey = 
  | 'llm'
  | 'image'
  | 'speech-to-text'
  | 'text-to-speech'
  | 'embeddings'
  | 'vision'
  | 'video'
  | 'music'
  | 'translation'
  | 'summarization'
  | 'code'
  | 'search'
  | 'moderation'
  | 'hosting'
  | 'aggregators';

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  iconName: string;
  description: string;
  count: number;
}

export interface ApiItem {
  id: string;
  name: string;
  category: CategoryKey;
  categoryLabel: string;
  description: string;
  freeTier: string;
  auth: AuthType;
  website: string;
  docs: string;
  tags: string[];
  isLocal?: boolean;
  popular?: boolean;
  playgroundSupported?: boolean;
  playgroundType?: 'pollinations' | 'free_llm' | 'translate' | 'duckduckgo' | 'mock';
  sampleCode?: {
    curl?: string;
    javascript?: string;
    python?: string;
  };
}

export interface ApiSubmission {
  name: string;
  website: string;
  category: CategoryKey;
  description: string;
  freeTier: string;
  auth: AuthType;
  docs: string;
  tags: string;
}

export type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'category';
