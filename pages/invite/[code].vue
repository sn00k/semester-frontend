<script setup lang="ts">
import SignUpForm from '~/components/SignUpForm.vue';
import Loading from '~/components/Loading.vue';
import Card from '~/components/Card.vue';
import type { Invitation } from '~/types';

definePageMeta({
  layout: 'start',
});

const API_URL = useRuntimeConfig().public.apiUrl;

const code = useRoute().params.code as string;
const validCode = ref(false);
const loading = ref(true);
const invitation = ref<Invitation>({
  active: false,
  code: '',
  company_id: '',
  email: '',
  id: '',
  sender_id: '',
  team_id: '',
});

watchEffect(async () => {
  const url = `${API_URL}/invitations/${code}`;
  console.log({ url });
  if (code) {
    const { data, error } = await useFetch<Invitation>(url);
    console.log('data: ', data.value);

    if (error.value || !data.value) {
      console.error(error);
      return;
    }

    invitation.value = data.value;
    loading.value = false;
    validCode.value = true;
  }
});
</script>

<template>
  <!-- Why does this need to be client only??? -->
  <ClientOnly>
    <Card class="flex flex-col gap-y-4">
      <div v-if="loading" class="flex justify-center items-center">
        <Loading />
      </div>
      <div>
        <SignUpForm v-bind="invitation" v-if="validCode" />
        <div v-else>
          <h2 class="text-xl font-semibold">Ogiltig inbjudan</h2>
          <div>Inbjudan är ogiltig eller har redan använts.</div>
        </div>
      </div>
    </Card>
  </ClientOnly>
</template>
