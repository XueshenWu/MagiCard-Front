
<script setup>
import FeatureBoard from '../components/layout/FeatureBoard.vue';
import FeatureBoardX from '../components/layout/FeatureBoardX.vue';
import SubscribeButton from '../components/layout/SubscribeButton.vue';
import { useRoute } from 'vue-router';
import { modalStore } from '../states/modalStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const route = useRoute();

const refId = route.query.refId;

if(refId!==undefined){
   modalStore.loginModalOpen = true;
}else{
   modalStore.registerRefId = refId;
}

const features = [
   {
       title: "memberBenefits.title",
       feature: "memberBenefits.feature", 
       paragraphs: ['memberBenefits.paragraphs.0'],
       src: "/main-no-product-bg2.png"
   },
   {
       title: "servicePromise.title",
       feature: "servicePromise.feature",
       paragraphs: [
           "servicePromise.paragraphs.0",
           "servicePromise.paragraphs.1"
       ],
       src: "/main-no-product-bg3.png"
   },
   {
       title: "importantNotes.title", 
       feature: "importantNotes.feature",
       paragraphs: ["importantNotes.paragraphs.0"],
       src: "/main-no-product-bg4.png"
   }
]
</script>

<template>
   <div class="flex flex-col items-center justify-start flex-grow h-full w-full gap-y-6 pt-12 pr-16">
       <div class="text-3xl font-semibold">
           {{ t('message.welcomeTitle') }}
       </div>
       <img src="/my-card-member.png" alt="my-card-member" class="w-[240px] h-[40px]" />
       <div class="grid grid-cols-4 gap-x-6 mt-6">
           <FeatureBoardX />
           <FeatureBoard v-for="feature in features" 
             :title="t(`message.${feature.title}`)" 
             :feature="t(`message.${feature.feature}`)"
             :paragraphs="feature.paragraphs.map(p => t(`message.${p}`))"
             :src="feature.src" />
       </div>
       <SubscribeButton/>
   </div>
</template>