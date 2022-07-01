<template>
    <base-card>
        <base-table
            title="Random Beers"
            :data="data"
            :dataTitle="dataTitle"
            @showDetails="showDetails"
        ></base-table>
    </base-card>
</template>

<script>
export default {
    emits: ['showDetails'],
    props: ['data', 'dataTitle', 'detailedDataToSend'],
    methods: {
        showDetails(data) {
            const name = 'beers';
            this.$emit('showDetails', data, name);
        }
    }
}
</script>