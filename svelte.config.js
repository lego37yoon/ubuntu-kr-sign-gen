import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
    kit: {
        // default options are shown
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: undefined,
            precompress: false,
            strict: true
        })
    },
    preprocess: [
        vitePreprocess({
            style: true
        })
    ]
};