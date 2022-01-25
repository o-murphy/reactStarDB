export default class SwapiService {

    _apiBase = 'https://swapi.dev/api/'

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could nt fetch $url` + `, recieved ${res.state}`)
        }
        return await res.json();
    };

    async getAllPeople() {
        const res = await this.getResourse(`/people/`);
        return res.results.map(this._transformPerson);
    }

    async getPerson(id) {
        const person = await this.getResourse(`people/${id}/`)
        return this._transformPerson(person)
    }

    async getAllPlanets() {
        const res = await this.getResourse(`/planets/`);
        return res.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResourse(`planets/${id}/`);
        return this._transformPlanet(planet)
    }

    async getAllStarships() {
        const res = await this.getResourse(`/starships/`);
        return res.results.map(this._transformStarship);
    }

    async getStarship(id) {
        const starship = await this.getResourse(`starships/${id}/`)
        return this._transformStarship(starship)
    }

    _extractId(item) {
        const regex = /\/(\d+)\/$/;
        return item.url.match(regex)[1];
    }

    _transformPlanet(planet) {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarship(starship) {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            length: starship.length,
            crew: starship.crew,
            passangers: starship.passangers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson(person) {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.length
        }
    }
}

/** usage template **/
// const swapi = new SwapiService();
// swapi.getAllPeople().then((people) => {
//     people.forEach((p) => console.log(p.name))
// })