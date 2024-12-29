<script lang="ts">
    import { enhance } from '$app/forms';
    import { UploadCloud, X, Check } from 'lucide-svelte';

    export let files: { id: string; size: number }[] | undefined;
    export let pageTitle: String;
    export let product: any | undefined = undefined;
    export let _selectedFiles: any[] | undefined = undefined;

    let count = 0;

    let loading = false;

    let images: any;
    let icon: any;
    let thumbnail: any;

    let selectedFiles: any = (_selectedFiles && _selectedFiles.map((f) => f.file_id)) || [];

    let currentImages: { thumbnail: any; icon: any; images: any } | null = null;

    let removedImages: string[] = [];

    $: if (product && product.images && product.images.length > 0) {
        currentImages = {
            thumbnail: product.images.find((e) => e.file.split('.')[0] === 'thumbnail'),
            icon: product.images.find((e) => e.file.split('.')[0] === 'icon'),
            images: product.images.filter(
                (e) => !['thumbnail', 'icon'].includes(e.file.split('.')[0])
            )
        };
    }

    const removeImage = (imageName: string) => {
        images = Array.from(images).filter((e) => e.name != imageName);
    };
    const removeIcon = (imageName: string) => {
        icon = Array.from(icon).filter((e) => e.name != imageName);
    };
    const removeThumbnail = (imageName: string) => {
        thumbnail = Array.from(thumbnail).filter((e) => e.name != imageName);
    };

    const removeCurrntThumbnail = () => {
        delete currentImages?.thumbnail;
    };

    const removeCurrntIcon = () => {
        delete currentImages?.icon;
    };

    const removeCurrentImage = (img: string) => {
        currentImages!.images = currentImages?.images.filter((e) => e.file !== img);
        if (currentImages?.images.length === 0) {
            delete currentImages.images;
        }

        removedImages.push(img);
    };
</script>

<form
    use:enhance={({ formData }) => {
        if (product) {
            formData.append('removed_images', JSON.stringify(removedImages));
        }
        if (_selectedFiles) {
            formData.append('previous_files', JSON.stringify(_selectedFiles.map((f) => f.file_id)));
        }

        loading = true;
        return async ({ update }) => {
            loading = false;
            images = [];
            icon = [];
            thumbnail = [];
            selectedFiles = [];
            update();
        };
    }}
    method="post"
    class="mt-8 flex flex-col gap-2 bg-section p-3 rounded-lg"
    enctype="multipart/form-data"
>
    <h4 class="text-h4 text-card font-semibold mb-3">{pageTitle}</h4>
    <div class="flex flex-col gap-0.5">
        <label for="title" class="text-card">Title:</label>
        <input
            type="text"
            name="title"
            id="title"
            placeholder="Product title"
            value={(product && product.name) || ''}
            required
            class="rounded-md p-1 px-2 bg-foreground text-card"
        />
    </div>
    <div class="flex flex-col gap-0.5">
        <label for="sku" class="text-card">Sku:</label>
        <input
            type="text"
            name="sku"
            id="sku"
            placeholder="Unique identifier"
            value={(product && product.sku) || ''}
            required
            readonly={product}
            class="rounded-md p-1 px-2 bg-foreground text-card"
        />
    </div>
    <div class="flex flex-col gap-0.5">
        <label for="tagline" class="text-card">Tagline:</label>

        <textarea
            name="tagline"
            id="tagline"
            cols="30"
            rows="6"
            placeholder="Product tagline"
            value={(product && product.tagline) || ''}
            required
            class="rounded-md p-1 px-2 bg-foreground text-card"
        ></textarea>
    </div>
    <div class="flex flex-col gap-0.5">
        <label for="price" class="text-card">Price:</label>
        <input
            type="number"
            name="price"
            id="price"
            placeholder="Price in £"
            value={(product && product.price) || ''}
            required
            class="rounded-md p-1 px-2 bg-foreground text-card"
        />
    </div>
    <div class="flex flex-col gap-0.5">
        <label for="content" class="text-card">Content:</label>
        <input
            type="text"
            name="content"
            id="content"
            placeholder="Add multiple content values seperated by |"
            value={(product && product.content) || ''}
            required
            class="rounded-md p-1 px-2 bg-foreground text-card"
        />
    </div>
    <div class="flex flex-col gap-0.5">
        <label for="format" class="text-card">Format:</label>
        <input
            type="text"
            name="format"
            id="format"
            placeholder="Format value"
            value={(product && product.format) || ''}
            required
            class="rounded-md p-1 px-2 bg-foreground text-card"
        />
    </div>
    <div class="flex flex-col gap-0.5">
        <label for="style" class="text-card">Style:</label>
        <input
            type="text"
            name="style"
            id="style"
            placeholder="Add multiple style values seperated by |"
            value={(product && product.style) || ''}
            required
            class="rounded-md p-1 px-2 bg-foreground text-card"
        />
    </div>

    <div class="flex flex-col gap-0.5">
        <label for="files" class="text-card">Files:</label>
        <select
            name="files"
            id="files"
            required
            class="bg-foreground p-1 px-2 rounded-md text-card h-96 scrollbar"
            multiple
            bind:value={selectedFiles}
        >
            {#if files}
                {#each files as file}
                    <option value={file.id} class="flex items-center gap-1">
                        {#if selectedFiles.includes(file.id)}
                            <Check size={14} />
                        {/if}
                        {file.id}
                    </option>
                {/each}
            {/if}
        </select>
    </div>

    <div class="flex flex-col gap-1">
        <div>
            <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/*"
                required={!product}
                bind:files={thumbnail}
                class="rounded-md p-1 px-2 bg-foreground text-card inputfile"
            />
            <label for="thumbnail" class="text-card flex items-center"
                ><UploadCloud /> <span>Choose Thumbnail...</span></label
            >
        </div>
        {#if thumbnail}
            {#each Array.from(thumbnail) as i}
                <button
                    class="text-card/80 text-xs flex items-center w-max gap-2"
                    on:click={() => removeThumbnail(i.name)}
                    type="button"
                >
                    <span>{i.name}</span>
                    <X
                        size={16}
                        class="text-primary-red font-bold rounded-full border border-primary-red"
                    />
                </button>
            {/each}
        {/if}

        {#if currentImages && currentImages.thumbnail}
            <h3 class="text-card font-medium">Current Thumbnail</h3>
            <div class="w-28 h-20 relative">
                <img
                    src={currentImages.thumbnail.url}
                    alt="Current thumbnail"
                    class="w-full h-full object-cover object-center"
                />

                <button on:click={removeCurrntThumbnail} type="button">
                    <X
                        class="bg-card/70 absolute right-1 top-1 rounded-full border border-primary-red stroke-primary-red"
                        size="20"
                    />
                </button>
            </div>
        {/if}
    </div>
    <div class="flex flex-col gap-1">
        <div>
            <input
                type="file"
                name="icon"
                id="icon"
                accept="image/*"
                required={!product}
                bind:files={icon}
                class="rounded-md p-1 px-2 bg-foreground text-card inputfile"
            />
            <label for="icon" class="text-card">
                <UploadCloud /> <span>Choose Icon...</span>
            </label>
        </div>
        {#if icon}
            {#each Array.from(icon) as i}
                <button
                    class="text-card/80 text-xs flex items-center w-max gap-2"
                    on:click={() => removeIcon(i.name)}
                    type="button"
                >
                    <span>{i.name}</span>
                    <X
                        size={16}
                        class="text-primary-red font-bold rounded-full border border-primary-red"
                    />
                </button>
            {/each}
        {/if}

        {#if currentImages && currentImages.icon}
            <h3 class="text-card font-medium">Current Icon</h3>
            <div class="w-28 h-20 relative">
                <img
                    src={currentImages.icon.url}
                    alt="Current icon"
                    class="w-full h-full object-cover object-center"
                />
                <button on:click={removeCurrntIcon} type="button">
                    <X
                        class="bg-card/70 absolute right-1 top-1 rounded-full border border-primary-red stroke-primary-red"
                        size="20"
                    />
                </button>
            </div>
        {/if}
    </div>
    <div class="flex flex-col gap-1">
        <div>
            <input
                type="file"
                name="images"
                id="images"
                multiple
                accept="image/*"
                required={!product}
                data-multiple-caption="{count} files selected"
                bind:files={images}
                class="rounded-md p-1 px-2 bg-foreground text-card inputfile"
            />
            <label for="images" class="text-card">
                <UploadCloud /> <span>Select Images...</span>
            </label>
        </div>
        {#if images}
            {#each Array.from(images) as image}
                <button
                    class="text-card/80 text-xs flex items-center w-max gap-2"
                    on:click={() => removeImage(image.name)}
                    type="button"
                >
                    <span>{image.name}</span>
                    <X
                        size={16}
                        class="text-primary-red font-bold rounded-full border border-primary-red"
                    />
                </button>
            {/each}
        {/if}

        {#if currentImages && currentImages.images && currentImages.images.length > 0}
            <h3 class="text-card font-medium">Current Images</h3>
            <div class="flex gap-2 overflow-y-hidden overflow-x-auto scrollbar">
                {#each currentImages.images as _image}
                    <div class="w-28 h-20 relative shrink-0">
                        <img
                            src={_image.url}
                            alt={_image.file.split('/')[1]}
                            class="w-full h-full object-cover object-center"
                        />
                        <button on:click={() => removeCurrentImage(_image.file)} type="button">
                            <X
                                class="bg-card/70 absolute right-1 top-1 rounded-full border border-primary-red stroke-primary-red"
                                size="20"
                            />
                        </button>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    <div class="flex flex-col gap-0.5">
        <label for="status" class="text-card">Status:</label>
        <select
            name="status"
            id="status"
            required
            class="bg-foreground p-1 px-2 rounded-md text-card"
        >
            <option value="live" selected={product && product.live ? product.live === true : null}
                >Live</option
            >
            <option
                value="archive"
                selected={product && product.live ? product.live === false : null}>Archive</option
            >
        </select>
    </div>

    <button
        type="submit"
        class="bg-blue-dark text-card py-2 px-4 rounded-md hover:bg-primary-blue"
        disabled={loading}
    >
        {loading ? 'Loading...' : product ? 'Update' : 'Upload'}
    </button>
</form>

<style lang="postcss">
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type='number'] {
        -moz-appearance: textfield;
    }

    .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .inputfile + label {
        color: white;
        background-color: black;
        display: flex;
        align-items: center;
        gap: 8px;
        width: max-content;
        cursor: pointer;
        padding: 4px 10px;
        border-radius: 4px;
    }

    .inputfile:focus + label,
    .inputfile + label:hover {
        background-color: rgb(var(--blue-dark));
    }

    .inputfile:focus + label {
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
    }

    .inputfile + label * {
        pointer-events: none;
    }

    .scrollbar {
        scrollbar-color: var(--foreground) var(--background) ;
        scrollbar-width: thin;
    }
</style>
