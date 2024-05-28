function RNG(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;
  
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
  }
  RNG.prototype.nextInt = function() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }
  RNG.prototype.nextFloat = function() {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  }
  RNG.prototype.nextRange = function(start, end) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    var rangeSize = end - start;
    var randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }
  RNG.prototype.choice = function(array) {
    return array[this.nextRange(0, array.length)];
  }

function resolveEvent(index) {
    console.log(index)
    choice = squire.event.choices[index];
    choice.effects.forEach(element => {
        element.effect(element.args);
    });
    squire.newEvent();
}

effects = {
    "damage": (args) => squire.adventurerHealth -= args[0],
    "heal": (args) => squire.adventurerHealth += args[0]
}

events = [
  { 
    "name": "event1",
    "description": "description1",
    "choices": [ 
      { 
        "title": "title1",
        "text": "heal 5", 
        "effects": [{"effect": effects.heal, "args": [5]}]
      },
      { 
        "title": "title2",
        "text": "damage 7", 
        "effects": [{"effect": effects.damage, "args": [7]}]
      },
      { 
        "title": "title3",
        "text": "option3!", 
        "effects": []
      }
    ]
  },
  { 
    "name": "event2",
    "description": "description2",
    "choices": [ 
      { 
        "title": "title1",
        "text": "option1!", 
        "effects": []
      },
      { 
        "title": "title2",
        "text": "option2!", 
        "effects": []
      },
      { 
        "title": "title3",
        "text": "option3!", 
        "effects": []
      }
    ]
  },
  { 
    "name": "event3",
    "description": "description3",
    "choices": [ 
      { 
        "title": "title1",
        "text": "option1!", 
        "effects": []
      },
      { 
        "title": "title2",
        "text": "option2!", 
        "effects": []
      },
      { 
        "title": "title3",
        "text": "option3!", 
        "effects": []
      }
    ]
  },
  { 
    "name": "event4",
    "description": "description4",
    "choices": [ 
      { 
        "title": "title1",
        "text": "option1!", 
        "effects": []
      },
      { 
        "title": "title2",
        "text": "option2!", 
        "effects": []
      },
      { 
        "title": "title3",
        "text": "option3!", 
        "effects": []
      }
    ]
  }
]

class Squire {
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

    _adventurerHealth = 10;
    get adventurerHealth() {
        return this._adventurerHealth;
    }
    set adventurerHealth(health) {
        document.getElementById('adventurerHealth').innerHTML = health;
        this._adventurerHealth = health;
    }

    _event = {};
    get event() {
        return this._event
    }
    set event(e) {
        if (!e) {
          return
        }
        document.getElementById('description').innerHTML = e.description;
        document.getElementById('title').innerHTML = e.name;
        for (var i=0; i<e.choices.length; i++) {
          document.getElementById('option'+(i+1)+'header').innerHTML = e.choices[i].title;
          document.getElementById('option'+(i+1)+'body').innerHTML = e.choices[i].text;
        }
        this._event = e;
    }
    
    constructor() {
      this.newName('squire');
      this.newName('adventurer');
      this.adventurerHealth = 10;
      this.seed = Date.now()
      this.rng = new RNG(this.seed);
      this.event = null;
      this.newEvent();
    }

    newEvent() {
      this.event = this.rng.choice(events);
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
            this.squireName = name;
        }
        else {
            this.adventurerName = name;
        }
       
    }

    getName() {
        return this.name;
    }
  }

squire = new Squire();

