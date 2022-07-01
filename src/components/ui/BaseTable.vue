<template>
    <div class="wraper">
        <h1>{{ title }}</h1>
        <table id="customers">
            <tr>
                <th v-for="dataTit in dataTitle" :key="dataTit">{{ dataTit }}</th>
            </tr>
            <tr @click="showDetails(dat)" v-for="dat in data" :key="dat">
                <td v-for="da in dat" :key="da">{{ da }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    emits: ['showDetails'],
    props: ['title', 'dataTitle', 'data'],
    methods: {
        showDetails(dat) {
            const data = dat
            this.$emit('showDetails', data);
        }
    }
}
</script>

<style scoped>

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  position: relative;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: tomato;
  color: white;
}

.wraper {
    display: inline;
    padding-top: 0px;
    text-align: center;
}
</style>