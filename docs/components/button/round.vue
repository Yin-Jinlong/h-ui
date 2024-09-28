<template>
    <div v-for="t in ['primary','plain'] as HButtonType[]">
        <div>
            <h-button v-for="s in ['small','normal','large','xlarge'] as NamedSize[]"
                      :size="s"
                      :type="t"
                      round>{{ s[0] }}
            </h-button>
        </div>
        <br>
    </div>
    <div data-flex-center style="justify-content: start">
        <h-button v-for="is in ['10','12','16','20']" round size="small" type="primary">
            <svg :width="is"
                 fill="white"
                 viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M853.333333 554.666667 554.666667 554.666667l0 298.666667c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666667-42.666667L469.333333 554.666667 170.666667 554.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667 0-23.466667 19.2-42.666667 42.666667-42.666667l298.666667 0L469.333333 170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667l0 298.666667 298.666667 0c23.466667 0 42.666667 19.2 42.666667 42.666667C896 535.466667 876.8 554.666667 853.333333 554.666667z"/>
            </svg>
        </h-button>
    </div>
</template>

<script lang="ts" setup>
import {HButtonType, HButton, NamedSize} from '@yin-jinlong/h-ui'
</script>
