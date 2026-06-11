// GitHub API utilities
const GITHUB_USERNAME = import.meta.env.GITHUB_USERNAME || 'queb';
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN; // Token opcional para límites más altos

interface Repository {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  topics: string[];
}

interface GitHubStats {
  followers: number;
  following: number;
  publicRepos: number;
  avatar: string;
  bio: string | null;
  name: string;
  location: string | null;
}

interface ContributionStats {
  totalContributions: number;
  streak: number;
  lastYear: number;
}

/**
 * Obtiene los repositorios del usuario de GitHub
 */
export async function getRepositories(limit: number = 6): Promise<Repository[]> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=${limit}`,
      { headers }
    );

    if (!response.ok) throw new Error('Failed to fetch repositories');

    const repos = await response.json();

    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics || [],
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

/**
 * Obtiene estadísticas del perfil de GitHub
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
    });

    if (!response.ok) throw new Error('Failed to fetch user data');

    const data = await response.json();

    return {
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      avatar: data.avatar_url,
      bio: data.bio,
      name: data.name,
      location: data.location,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

/**
 * Obtiene repositorios destacados (pinned)
 */
export async function getPinnedRepositories(): Promise<Repository[]> {
  try {
    // Nota: La API de GitHub no expone directamente los repos pinned,
    // por lo que retornamos los más populares como alternativa
    return await getRepositories(3);
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    return [];
  }
}

