<template>
    <div class="h-card">
        <div class="h-card-header"
             data-empty-hide
             data-fill-width>
            <slot name="header"/>
        </div>
        <div class="h-card-content">
            <slot name="default"/>
        </div>
        <div class="h-card-footer"
             data-empty-hide>
            <slot name="footer"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
