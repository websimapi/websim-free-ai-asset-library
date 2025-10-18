export class ImageGenerator {
    constructor(room) {
        this.room = room;
        this.styles = [
            { name: "Photorealistic HD (16:9)", prompt_modifier: "photorealistic, cinematic lighting, 8k", aspect_ratio: "16:9" },
            { name: "High Detail 4:3", prompt_modifier: "highly detailed digital painting, vibrant colors", aspect_ratio: "4:3" },
            { name: "Low Detail (LD, Square)", prompt_modifier: "simple vector art, solid colors, low poly look", aspect_ratio: "1:1" },
            { name: "Retro 8-bit Pixel Art (Square)", prompt_modifier: "8-bit pixel art style, retro game aesthetic", aspect_ratio: "1:1" },
            { name: "16-bit RPG Sprite Style (Square)", prompt_modifier: "16-bit pixel art style, reminiscent of SNES RPGs", aspect_ratio: "1:1" },
            { name: "32-bit PS1 Era Graphics (Square)", prompt_modifier: "3D rendered low polygon count, PS1 era graphics, texture warping", aspect_ratio: "1:1" },
            { name: "Abstract Oil Painting (4:5)", prompt_modifier: "abstract oil painting, thick impasto strokes, dark palette", aspect_ratio: "4:5" },
            { name: "Minimalist Vector (Square)", prompt_modifier: "minimalist vector illustration, flat design, clean lines", aspect_ratio: "1:1" },
        ];

        this.elements = {
            generator: document.getElementById('image-generator'),
            button: document.getElementById('generate-image-btn'),
            promptInput: document.getElementById('image-prompt'),
            styleSelect: document.getElementById('image-style'),
            submitBtn: document.getElementById('generate-image-submit'),
            preview: document.getElementById('image-preview'),
            display: document.getElementById('generated-image-display')
        };

        this.isOpen = false;
    }

    populateStyles() {
        this.elements.styleSelect.innerHTML = '';
        this.styles.forEach(style => {
            const option = document.createElement('option');
            const modifierPrefix = `${style.prompt_modifier}`;
            const modifierSuffix = `, ${style.prompt_modifier}`;

            option.value = JSON.stringify({ prefix: modifierPrefix, suffix: modifierSuffix, aspect: style.aspect_ratio });
            option.textContent = style.name;
            this.elements.styleSelect.appendChild(option);
        });
    }

    toggle() {
        this.isOpen = !this.elements.generator.classList.contains('hidden');
        this.elements.generator.classList.toggle('hidden');
        this.elements.button.classList.toggle('active', !this.elements.generator.classList.contains('hidden'));

        if (!this.elements.generator.classList.contains('hidden')) {
            this.populateStyles();
        }

        return !this.elements.generator.classList.contains('hidden');
    }

    close() {
        this.elements.generator.classList.add('hidden');
        this.elements.button.classList.remove('active');
        this.isOpen = false;
    }

    setLoading(isLoading) {
        const btnText = this.elements.submitBtn.querySelector('.btn-text');
        const loader = this.elements.submitBtn.querySelector('.loader');
        this.elements.submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    async submit() {
        const basePrompt = this.elements.promptInput.value.trim();
        if (!basePrompt) {
            alert("Please enter a prompt.");
            return;
        }

        const selectedOption = this.elements.styleSelect.options[this.elements.styleSelect.selectedIndex];
        let modifiers;
        try {
            modifiers = JSON.parse(selectedOption.value);
        } catch (e) {
            console.error("Invalid style value:", selectedOption.value);
            alert("Selected style is invalid.");
            return;
        }

        const prompt = `${modifiers.prefix}, ${basePrompt}${modifiers.suffix}`;
        const aspect_ratio = modifiers.aspect;

        this.setLoading(true);
        this.elements.preview.classList.add('hidden');
        this.elements.display.src = '';

        try {
            const result = await websim.imageGen({
                prompt,
                aspect_ratio,
            });

            const imageUrl = result.url;

            this.elements.display.src = imageUrl;
            this.elements.preview.classList.remove('hidden');

            const currentUser = await window.websim.getCurrentUser();
            const userRecords = this.room.collection('user_data_v2').getList();
            const userRecord = userRecords.find(r => r.username === currentUser.username);

            const newImageId = 'img_' + Date.now() + Math.random().toString(36).substring(2, 9);
            const newImageAsset = {
                id: newImageId,
                name: `Image: ${basePrompt.substring(0, 20)}${basePrompt.length > 20 ? '...' : ''}`,
                src: imageUrl,
                prompt: basePrompt,
                fullPrompt: prompt,
                style: selectedOption.textContent,
                tags: ['image', 'user-generated']
            };

            if (userRecord) {
                const newImageAssets = { ...(userRecord.image_assets || {}), [newImageId]: newImageAsset };
                await this.room.collection('user_data_v2').update(userRecord.id, { image_assets: newImageAssets });
            } else {
                await this.room.collection('user_data_v2').create({
                    image_assets: { [newImageId]: newImageAsset },
                    tts_assets: {},
                    favorites: {}
                });
            }

        } catch (error) {
            console.error("Failed to generate Image:", error);
            alert("Sorry, there was an error generating the image.");
            this.elements.preview.classList.add('hidden');
        } finally {
            this.setLoading(false);
        }
    }
}