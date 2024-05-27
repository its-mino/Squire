class Squire {
    constructor() {
      this.newName('squire');
      this.newName('adventurer');
      this.adventurerHealth = 10;
    }

    _squireName = "";
    get squireName() {
        return this._squireName;
    }
    set squireName(name) {
        document.getElementById('squireName').innerHTML = name;
        this._squireName = name;
    }

    _adventurerName = "";
    get adventurerName() {
        return this._adventurerName;
    }
    set adventurerName(name) {
        document.getElementById('adventurerName').innerHTML = name;
        this._adventurerName = name;
    }

    newName(target) {
        fetch('https://chartopia.d12dev.com/api/charts/32000/roll/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
        })
        .then((response) => response.json())
        .then((json) => this.setName(json.results[0], target));
    }

    setName(name, target) {
        if (target == 'squire') {
            this.squireName(name);
        }
        else {
            this.adventurerName(name);
        }
       
    }

    getName() {
        return this.name;
    }
  }

new Squire();

