<script setup lang="tsx">
import { useQuery } from '@tanstack/vue-query';
import DatePicker from 'vue-tailwind-datepicker';
import { Button } from '~/components/button';
import { EditRowButton, TableCheckbox } from '~/components/table';
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/vue-table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import { AbsenceTypeSelector } from '~/components/select';
import { useAbsenceStore, useAuthStore } from '~/stores';
import type { Absences } from '~/types';

useState('pageTitle', () => 'Min Sida');
definePageMeta({
  middleware: 'auth',
  title: 'Min Tid',
});

const absenceStore = useAbsenceStore();
const selectedAbsenceType = ref<string>('');
const selectedTypeId = ref<string>('');
const expandedItemId = ref<string | null>(null);
const API_URL = useRuntimeConfig().public.apiUrl;
const absenceDates = ref({
  startDate: '',
  endDate: '',
});

const { submitAbsence, submitError, submitSuccess, isSubmitting } =
  useSubmitAbsence();

const { deleteAbsence, deleteError, isDeleting } = useDeleteAbsence();

const tableSort = ref<SortingState>([]);

const data = ref([
  {
    id: '1',
    absenceType: 'Sjukdom',
    period: '2021-10-01 - 2021-10-05',
    created: 'Idag',
    status: 'Godkänd',
  },
  {
    id: '2',
    absenceType: 'Semester',
    period: '2024-08-20 - 2024-08-30',
    created: 'Igår',
    status: 'Ej Godkänd',
  },
]);

const absenceColumns = [
  {
    id: 'select',
    header: ({ table }: { table: any }) => {
      return (
        <TableCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        ></TableCheckbox>
      );
    },
    cell: ({ row }: { row: any }) => {
      return (
        <div class="px-1">
          <TableCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          ></TableCheckbox>
        </div>
      );
    },
  },
  {
    accessorKey: 'absenceType',
    header: 'Frånvarotyp',
    enableSorting: false,
  },
  {
    accessorKey: 'period',
    header: 'Period',
    enableSorting: false,
  },
  {
    accessorKey: 'created',
    header: 'Inskickad',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'actions',
    header: 'Ändra',
    cell: () => h(EditRowButton),
    enableSorting: false,
  },
];

const table = useVueTable({
  data: data.value,
  columns: absenceColumns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get sorting() {
      return tableSort.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    tableSort.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(tableSort.value)
        : updaterOrValue;
  },
});

const fetcher = async (): Promise<Absences> =>
  await fetch(`${API_URL}/absences?user_id=${useAuthStore().user.id}`, {
    headers: {
      Authorization: `Bearer ${useCookie('token').value}`,
      Accept: 'application/json',
    },
  }).then((response) => response.json());

const { data: absences } = useQuery({
  queryKey: ['absences'],
  queryFn: fetcher,
});

function ensureCompanySelected(companyId: string) {
  if (!absenceStore.selectedCompanyId) {
    absenceStore.setSelectedCompanyId(companyId);
  }
}

watch(submitSuccess, (newValue) => {
  if (newValue) {
    // Handle successful absence submission
    absenceDates.value = { startDate: '', endDate: '' };
    selectedAbsenceType.value = '';
    selectedTypeId.value = '';
  }
});
</script>

<template>
  <Headline>
    <template #left>
      <img
        class="inline-block size-6 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </template>
    <template #right>
      <span class="material-icons lg:hidden">notifications</span>
    </template>
  </Headline>
  <div class="flex flex-col p-4 lg:py-0">
    <!-- Desktop view -->
    <div class="hidden md:block">
      <div class="flex justify-end">
        <Button class="bg-blue-950 text-white">
          <span class="mr-1 material-symbols-outlined icon-filled">
            delete
          </span>
          Radera
        </Button>
      </div>
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              scope="col"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              :class="{
                'cursor-pointer select-none': header.column.getCanSort(),
              }"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <ClientOnly>
                {{ { asc: '↑', desc: '↓' }[header.column.getIsSorted() as 'asc' | 'desc'] }}
              </ClientOnly>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="bg-white dark:bg-neutral-900 dark:text-white gap-x-4 mt-4 items-center w-full p-3 rounded-md"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile view -->
    <div class="block md:hidden">
      <Accordion type="single" collapsible class="w-full flex flex-col gap-y-4">
        <AccordionItem
          v-for="absence in absences?.data"
          :key="absence.id"
          :value="absence.id"
        >
          <div
            class="flex bg-white text-black dark:text-white dark:bg-[#1F1F1F] gap-x-2 sm:gap-x-4 mt-4 items-center w-full p-2 rounded-md"
            :class="{ 'rounded-b-none': expandedItemId === absence.id }"
          >
            <div
              class="inline-block bg-gray-300 size-10 rounded-full ring-2 ring-white"
            ></div>
            <div class="flex flex-col grow">
              <div class="font-semibold">
                <span v-text="absence.absence_type"></span>
              </div>
              <div class="text-xs">
                <div>
                  <span>
                    {{ $dayjs(absence.start_at).format('YY/MM/DD') }} -
                    {{ $dayjs(absence.end_at).format('YY/MM/DD') }}
                  </span>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-100 dark:text-white text-xs sm:text-base dark:bg-zinc-800"
            >
              <div
                class="flex items-center gap-x-2 rounded-md border border-gray-400 px-2 py-1"
              >
                <span
                  class="block size-2 rounded-full bg-green-500"
                  :class="[
                    { 'bg-green-500': absence.approved },
                    { 'bg-red-500': !absence.approved },
                    { 'bg-orange-500': absence.approved === null },
                  ]"
                ></span>
                <span v-if="absence.approved">Godkänd</span>
                <span v-else-if="absence.approved === false">Ej Godkänd</span>
                <span v-else>Ej Behandlad</span>
              </div>
            </div>
            <AccordionTrigger
              class="accordion-trigger"
              @click="
                expandedItemId =
                  expandedItemId === absence.id ? null : absence.id
              "
            >
              <template #icon>
                <span
                  class="material-icons accordion-chevron"
                  :class="{ 'rotate-180': expandedItemId === absence.id }"
                >
                  expand_more
                </span>
              </template>
            </AccordionTrigger>
          </div>
          <Transition name="accordion" mode="out-in">
            <div
              v-if="expandedItemId === absence.id"
              class="flex bg-white text-black dark:text-white dark:bg-[#1F1F1F] items-center w-full p-2 rounded-md"
              :class="{ 'rounded-t-none': expandedItemId === absence.id }"
            >
              <AccordionContent class="accordion-content flex w-full p-2">
                <Dialog>
                  <DialogTrigger as-child>
                    <Button
                      class="flex-1 mx-2 bg-white ring-2 rounded-xl ring-accent-light text-accent-light dark:bg-zinc-800 dark:text-yellow-400 dark:ring-0"
                    >
                      <span class="material-symbols-outlined scale-75">
                        delete
                      </span>
                      <span>Radera</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Radera Frånvaro</DialogTitle>
                      <DialogDescription>
                        Är du säker på att du vill radera frånvaro
                        <strong>{{ absence.absence_type }}</strong> för perioden
                        {{ $dayjs(absence.start_at).format('YY/MM/DD') }} -
                        {{ $dayjs(absence.end_at).format('YY/MM/DD') }}?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter
                      class="gap-y-4 sm:flex-row-reverse sm:justify-start"
                    >
                      <DialogClose as-child>
                        <Button variant="secondary"> Avbryt </Button>
                      </DialogClose>
                      <Button
                        variant="secondary"
                        @click="deleteAbsence({ absenceId: absence.id })"
                      >
                        Bekräfta
                      </Button>
                    </DialogFooter>
                    <template v-if="isDeleting">
                      <p>Submitting...</p>
                    </template>
                    <template v-if="deleteError">
                      <p>Error: {{ deleteError.message }}</p>
                    </template>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger as-child>
                    <Button
                      class="flex-1 mx-2 ring-2 rounded-xl ring-accent-light bg-accent-light dark:bg-yellow-400 dark:text-black dark:ring-0 text-white"
                      @click="ensureCompanySelected(absence.company_id)"
                    >
                      <span class="material-icons scale-75">edit</span>
                      <span>Ändra</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Ändra Frånvaro</DialogTitle>
                      <DialogDescription>
                        Vänligen välj en ny frånvarotyp och datum för frånvaron
                      </DialogDescription>
                    </DialogHeader>
                    <AbsenceTypeSelector
                      placeholder="Frånvarotyp"
                      :absence-types="absenceStore.absences ?? []"
                      :selected-absence-type="selectedAbsenceType"
                      :selected-type-id="selectedTypeId"
                      @update:selectedAbsenceType="
                        (value) => (selectedAbsenceType = value)
                      "
                      @update:selectedTypeId="
                        (value) => (selectedTypeId = value)
                      "
                    />

                    <template v-if="selectedAbsenceType">
                      <div>
                        <DatePicker
                          class="py-4 px-4 border-none"
                          v-model="absenceDates"
                          as-single
                          week-number
                          use-range
                          no-input
                          :shortcuts="false"
                        />
                      </div>
                    </template>

                    <template
                      v-if="
                        selectedAbsenceType &&
                        absenceDates.startDate &&
                        absenceStore.isCompanySelected
                      "
                    >
                      <div class="flex justify-center items-center py-8">
                        <button
                          class="dark:bg-accent-dark bg-accent-light text-white dark:text-black rounded-lg w-40 px-2 py-2"
                          @click="
                            submitAbsence({
                              absenceId: absence.id,
                              absenceDates: absenceDates,
                              selectedTypeId: selectedTypeId,
                              action: 'update',
                            })
                          "
                        >
                          Skicka ansökan
                        </button>
                      </div>
                    </template>

                    <template v-if="isSubmitting">
                      <p>Submitting...</p>
                    </template>
                    <template v-if="submitError">
                      <p>Error: {{ submitError.message }}</p>
                    </template>
                  </DialogContent>
                </Dialog>
              </AccordionContent>
            </div>
          </Transition>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<style scoped>
.accordion-content[data-state='open'] {
  padding-top: 16px;
}

.accordion-chevron {
  transition: transform 300ms;
}
.accordion-trigger[data-state='open'] > .accordion-chevron {
  transform: rotate(180deg);
}

.rotate-180 {
  transform: rotate(180deg);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
