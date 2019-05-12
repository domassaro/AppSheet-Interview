import { decorate, observable } from "mobx"

export default class ResultStore {
  constructor() {
    this.resultsList = {
      results: []
  };

  // async fetchProfiles() {
  //   let results = await this.fetchAllResults();
  //   let profiles = [];
  //   for (let i = 0; i < results.length; i++) {
  //     let profile = await this.fetchProfile(results[i]);
  //     if (profile) {
  //       profiles.push(profile);
  //     }
  //   }
  //   return profiles;
  // }

  // async fetchProfile(profileId) {
  //   let url = `https://appsheettest1.azurewebsites.net/sample/detail/${profileId}`;
  //   return await fetch(url)
  //     .then(res => res.json())
  //     .then((res) => {
  //       return res;
  //     },
  //     (error) => {
  //       return null;
  //     });
  // }

  // async fetchAllResults() {
  //   let url = 'https://appsheettest1.azurewebsites.net/sample/list';
  //   let response = null;
  //   let results = [];
  //   do {
  //       response = await fetch(url)
  //       .then(res => res.json())
  //       .then((res) => {
  //           return res;
  //       });
  //       results = results.concat(response.result);
  //       if (response.token) {
  //           let newUrl = new URL(url);
  //           newUrl.searchParams.set('token', response.token)
  //           url = newUrl.toString();
  //       }
  //   } while (response.token);
  //   return results;
  // }

  // this.results = await this.fetchProfiles()

  
  }
}

decorate(ResultStore, {
  results: observable,
});