<script setup lang='ts'>
import { roll } from 'dice-utils';
const appStore = useGeneralStore()

const Statistics = {
    STR: 'Strength',
    DEX: 'Dexterity',
    CON: 'Constitution',
    INT: 'Intelligence',
    WIS: 'Wisdom',
    CHA: 'Charisma',
} as const
interface STATS_DATA {
    stat: typeof Statistics[keyof typeof Statistics]
    total: number
    results: number[]
}

const characterStats = ref<Record<keyof typeof Statistics, STATS_DATA>>({
    STR: { stat: 'Strength', total: 0, results: [] },
    DEX: { stat: 'Dexterity', total: 0, results: [] },
    CON: { stat: 'Constitution', total: 0, results: [] },
    INT: { stat: 'Intelligence', total: 0, results: [] },
    WIS: { stat: 'Wisdom', total: 0, results: [] },
    CHA: { stat: 'Charisma', total: 0, results: [] },
})
const rollHistory = ref<Record<keyof typeof Statistics, STATS_DATA[]>>({
    STR: [],
    DEX: [],
    CON: [],
    INT: [],
    WIS: [],
    CHA: [],
})

const diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100', 'fudge']
const diceType = ref('d6')
const diceAmount = ref(3)

interface RollResult {
    total: number
    results: number[]
}

function rollStats() {
    const dice = diceType.value === 'fudge' ? 'dF' : diceType.value
    const amount = diceAmount.value
    const statNames = Object.keys(characterStats.value) as (keyof typeof Statistics)[]

    statNames.forEach((statName) => {
        if (characterStats.value[statName].results.length) {
            const copyData = JSON.parse(JSON.stringify(characterStats.value[statName]))
            rollHistory.value[statName].push(copyData)
        }
        const statRoll = roll(`${amount}${dice}`) as RollResult
        characterStats.value[statName].total = statRoll.total
        characterStats.value[statName].results = statRoll.results
    })
}
onBeforeMount(() => {
    appStore.toggleLayoutStart()
})
</script>

<template>
    <section class="p-4 rounded-2 bg-slate-8 my-4">
        <form @submit.prevent="rollStats" class="flex justify-between items-center">
            <label for="dice">Dice</label>
            <select id="dice" v-model="diceType" class="border rounded bg-transparent px-2">
                <option v-for="type in diceTypes" :key="type" :value="type">
                    {{ type }}
                </option>
            </select>
            <label for="amount">Amount</label>
            <input id="amount" type="number" v-model="diceAmount" class="border rounded bg-transparent px-2">
            <button type="submit" class="rounded bg-violet-500 px-4 py-1 text-slate-100 capitalize">
                Roll
            </button>
        </form>
    </section>
    <section class="grid grid-cols-1 gap-4 md:grid-cols-3 text-slate-700 dark:text-slate-200 mb-8">
        <article v-for="(statData, statName) in characterStats" :key="statData.stat" class="border rounded p-4">
            <h2 class="text-xl font-bold uppercase">
                {{ statName }}
            </h2>
            <p class="text-sm text-slate-500">
                {{ statData.stat }}
            </p>
            <p class="text-3xl font-bold">
                {{ statData.total }}
            </p>
            <p class="text-sm text-slate-500">
                {{ statData.results.join(', ') }}
            </p>
        </article>
    </section>
    <section class="layout-grid-feature grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-6 bg-slate-6 rounded-2">
        <article v-for="(statDatas, statName) in rollHistory" :key="statName" class="rounded p-4">
            <p>{{ statName }}</p>
            <ul>
                <li v-for="(statData, index) in statDatas" :key="statName + index" class="text-sm text-slate-500">
                    {{ statData.total }} | {{ statData.results.join(', ') }}
                </li>
            </ul>
        </article>
    </section>
</template>
