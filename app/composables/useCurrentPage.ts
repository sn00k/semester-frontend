export function useCurrentPage() {
  const currentPage = ref('');

  onMounted(() => {
    const route = useRoute();
    currentPage.value = route.name ? route.name.toString() : 'unknown';
  });

  return { currentPage };
}
