<script setup lang="ts">
defineProps<{
    endpoint: string;
    method: "GET";
    description: string | undefined;
    apiVersion: "V1" | "V2";
}>();

const colorMode = useColorMode();
</script>

<template>
    <div>
        <div class="flex justify-between items-start">
            <div class="flex items-start">
                <ClientOnly v-if="method">
                    <UBadge
                        size="sm"
                        :variant="
                            colorMode.preference == 'dark' ? 'outline' : 'solid'
                        "
                        class="me-3"
                        >{{ method }}</UBadge
                    >
                    <template #fallback>
                        <USkeleton class="h-6 w-12 me-1" />
                    </template>
                </ClientOnly>
                <p class="font-bold text-base overflow-auto w-48 sm:w-fit">
                    {{ endpoint }}
                </p>
            </div>
            <ClientOnly>
                <UTooltip
                    :text="apiVersion == 'V1' ? 'Version 1' : 'Version 2'"
                    :popper="{ placement: 'top' }"
                >
                    <UBadge
                        size="sm"
                        variant="outline"
                        color="sky"
                        class="me-3 text-base font-extrabold cursor-default ring-0"
                        >{{ apiVersion }}</UBadge
                    >
                </UTooltip>
            </ClientOnly>
        </div>

        <div
            v-if="description"
            class="text-base my-3 ms-5 text-neutral-600 dark:text-stone-400"
        >
            <p class="">{{ description }}</p>
        </div>
    </div>
</template>
