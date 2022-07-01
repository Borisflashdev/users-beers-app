<template>
  <base-dialog :title="title" :show="showDialog" @close="close">
    <base-table :data="detailedDataToSend" :dataTitle="detailedDataTitleToSend" ></base-table>
  </base-dialog>
  <base-card>
    <div class="link-div">
      <base-button to="/users" @click="sendData = 'users'">Random Users</base-button>
      <base-button to="/beers" @click="sendData = 'beers'">Random Beers</base-button>
    </div>
  </base-card>
  <router-view :data="dataToSend" :dataTitle="dataTitleToSend" @showDetails="showDetails" v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sendData: 'users',
      detailedDataToSend: [],
      detailedDataTitleToSend: [],
      title: null,

      showDialog: false,

      userTable: {
        dataTitle: ['Name', 'Phone', 'Email'],
        detailedDataTitle: ['First Name', 'Last Name', 'Phone', 'Email', 'Gender', 'Age', 'Country'],
        userData: [],
        detailedUserData: []
      },

      beersTable: {
        dataTitle: ['Name', 'Brand', 'Alcohol'],
        detailedDataTitle: ['Name', 'Brand', 'Alcohol', 'Style', 'Malts', 'Blg', 'Hop'],
        beersData: [],
        detailedBeersData: []
      }

    }
  },
  computed: {
    dataToSend() {
      if (this.sendData === 'users') {
        return this.userTable.userData;
      } else {
        return this.beersTable.beersData;
      }
    },
    dataTitleToSend() {
      if (this.sendData === 'users') {
        return this.userTable.dataTitle;
      } else {
        return this.beersTable.dataTitle;
      }
    }
  },
  methods: {
    close() {
      this.showDialog = false;
    },
    usersList() {
      axios.get('https://randomuser.me/api/?page=3&results=10&seed=abc').then((responseData) => {
        for (let i = 0; i < 10; i++) {

          const detailedData = {
            firstName: responseData.data.results[i].name.first,
            lastName: responseData.data.results[i].name.last,
            phone: responseData.data.results[i].phone,
            email: responseData.data.results[i].email,
            gender: responseData.data.results[i].gender,
            age: responseData.data.results[i].registered.age,
            location: responseData.data.results[i].location.country
          }
          this.userTable.detailedUserData.push(detailedData);

          const data = {
            name: responseData.data.results[i].name.first + ' ' + responseData.data.results[i].name.last,
            phone: responseData.data.results[i].phone,
            email: responseData.data.results[i].email
          };
          this.userTable.userData.push(data);
        }
      });
    },
    beersList() {

      axios.get(`https://random-data-api.com/api/beer/random_beer?size=10`).then((responseData) => {
        for (let i = 0; i < 10; i++) {
          console.log(responseData);
          const detailedData = {
            name: responseData.data[i].name,
            brand: responseData.data[i].brand,
            alcohol: responseData.data[i].alcohol,
            style: responseData.data[i].style,
            malts: responseData.data[i].malts,
            blg: responseData.data[i].blg,
            hop: responseData.data[i].hop
          }
          this.beersTable.detailedBeersData.push(detailedData);

          const data = {
            name: responseData.data[i].name,
            brand: responseData.data[i].brand,
            alcohol: responseData.data[i].alcohol
          }
          this.beersTable.beersData.push(data);
        }
      });
    },
    showDetailsUsers(data) {
      const dataIdentifier = data.email
      this.userTable.detailedUserData.forEach((userData) => {
        if (userData.email === dataIdentifier) {
          this.showDialog = true;
          this.title = userData.firstName + ' ' + userData.lastName + ' Details';
          this.detailedDataToSend.push(userData);
          this.detailedDataTitleToSend = this.userTable.detailedDataTitle;
        }
      });
    },
    showDetailsBeers(data) {
      const dataIdentifier = data.name
      this.beersTable.detailedBeersData.forEach((beerData) => {
        if (beerData.name === dataIdentifier) {
          this.showDialog = true;
          this.title = beerData.name + ' Details';
          this.detailedDataToSend.push(beerData);
          this.detailedDataTitleToSend = this.beersTable.detailedDataTitle;
        }
      });
    },
    showDetails(data, name) {
      this.detailedDataToSend = [];
      this.detailedDataTitleToSend = [];
      if (name === 'users') {
        this.showDetailsUsers(data);
      } else if (name === 'beers') {
        this.showDetailsBeers(data);
      }
    }
  },
  created() {
    this.usersList();
    this.beersList();
  }
}
</script>

<style>
body {
  background-color: tomato;
}

.link-div {
  display: flex;
  justify-content: space-evenly;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>