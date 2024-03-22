<template>
    <div class="card">
        <div class="card-header"
             data-empty-hide
             data-fill-width>
            <slot name="header"/>
        </div>
        <div class="card-content">
            <slot name="default"/>
        </div>
        <div class="card-footer"
             data-empty-hide>
            <slot name="footer"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../../style/tools/fns';

.card {
  background-color : var(--card-background);
  border-radius    : 10px;
  box-shadow       : 2px 2px 20px 0 rgba(0, 0, 0, 0.25);
  margin           : 2em;
  min-width        : 200px;
  padding          : get-css(padding, xlarge);
  width            : max-content;

  & > div:not(:first-child) {
    margin-top : get-css(padding, xlarge);
  }

}

.card-header {
  border-bottom : #222 solid 2px;
  font-size     : 20px;
  font-weight   : 900;
}

.card-content {
  box-sizing : border-box;
  width      : 100%;
}

</style>

<script lang="ts" setup>

</script>
