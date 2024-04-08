<template>
    <div class="h-card">
        <div v-if="$slots.header"
             class="h-card-header"
             data-break-line
             data-fill-width
             data-relative>
            <slot name="header"/>
        </div>
        <div v-if="$slots.header" class="h-card-line"/>
        <div class="h-card-content" data-relative>
            <slot name="default"/>
        </div>
        <div v-if="$slots.footer" class="h-card-line"/>
        <div v-if="$slots.footer"
             class="h-card-footer"
             data-relative>
            <slot name="footer"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
