    const data = {
        "blue" : {
            "amn": 21,
            "afr": 19,
            "asi": 18,
            "oce": 10,
            "eur": 9,
            "ams": 7
        },
        "red" : {
            "amn": 0,
            "afr": 5,
            "asi": 20,
            "oce": 0,
            "eur": 38,
            "ams": 5
        },
        "green" : {
            "amn": 1,
            "afr": 27,
            "asi": 7,
            "oce": 3,
            "eur": 2,
            "ams": 0
        },
        "black" : {
            "amn": 1,
            "afr": 3,
            "asi": 2,
            "oce": 1,
            "eur": 0,
            "ams": 0
        }

    }

    const dataLegend = {
        "ams" : {
            "blue": 7,
            "red": 5,
            "green": 0,
            "black": 0,
        },
        "eur" : {
            "blue": 9,
            "red": 38,
            "green": 2,
            "black": 0,
        },
        "oce" : {
            "blue": 10,
            "red": 0,
            "green": 3,
            "black": 1,
        },
        "asi" : {
            "blue": 18,
            "red": 20,
            "green": 7,
            "black": 2,
        },
        "afr" : {
            "blue": 19,
            "red": 5,
            "green": 27,
            "black": 3,
        },
        "amn" : {
            "blue": 21,
            "red": 0,
            "green": 1,
            "black": 1,
        }
    }
    const barWidth = "120";
    const  barSpacing = "10";
    const scaling = 6;
    const  nations = Object.keys(data.blue)
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
    const colors = {
        "blue" : '#124667',
        "red": '#6c2434',
        "green":  '#003e2f',
        "black": "#171717"
    }

    // canvas
    const canvas = document.getElementById('canvas')
    canvas.style.width = Object.keys(data).length * barWidth + (Object.keys(data).length* barSpacing)  + "px";

    // y-axis
    const y_axis = document.getElementById("y_axis");
    const amountTicks = 8
    y_axis.style.height = amountTicks * 10 * scaling;
    for (let i =1; i <=amountTicks; i ++) {
        let tick = document.createElement("div");
        tick.style.height = 10 *scaling;
        tick.classList += "y_axis-tick";
        let tickSpan  = document.createElement("span");
        tickSpan.innerHTML = i *10 ;
        tick.appendChild(tickSpan);
        y_axis.appendChild(tick);
    }

    // legend
    const legend = document.getElementById("legend");
    for (const [index, [key, value]] of Object.entries(Object.entries(dataLegend))) {
        let legendEntry = document.createElement("div");
        let legendEntryText = document.createElement("div");
        let legendEntryTextInner = document.createElement("span");
        let legendEntryBubbles = document.createElement("div");
        legendEntryBubbles.classList += key + "_bubbles legend_entry--bubbles d-flex"
        legendEntryTextInner.innerHTML = key;
        legendEntry.id =  key + "_legend_entry"
        legendEntry.classList += key + " legend_entry";
        legendEntryText.classList += " legend_entry--text"
        legendEntryText.appendChild(legendEntryTextInner);
        legendEntry.appendChild(legendEntryText);
        legendEntry.appendChild(legendEntryBubbles);
        legend.appendChild(legendEntry);
        for (const [i, [k, v]] of Object.entries(Object.entries(value))) {
            let legendEntryBubble = document.createElement("div");
            let legendEntryBubbleText = document.createElement("span");
            let legendEntryBubbleTextBefore = document.createElement("span");
            legendEntryBubble.classList += k + " legend_entry--bubble";
            legendEntryBubbleText.innerText = v;
            legendEntryBubbleTextBefore.classList += "legend_entry--bubble-before";
            legendEntryBubbleTextBefore.style.backgroundColor = colors[k]
            legendEntryBubble.appendChild(legendEntryBubbleTextBefore);
            legendEntryBubble.appendChild(legendEntryBubbleText);
            legendEntryBubbles.appendChild(legendEntryBubble);
        }
    }



    for (const [index, [key, value]] of Object.entries(Object.entries(data))) {
        let bar = document.createElement("div");
        bar.style.width = barWidth;
        // 5 border == 5px extra
        bar.style.height = (sumValues(value) * scaling) + 5;
        bar.style.background = colors[key];
        bar.id = key;
        bar.classList += "bar";
        document.getElementById("canvas").appendChild(bar);
        for (const [i, [k, v]] of Object.entries(Object.entries(value))) {
            let insideBar = document.createElement("div");
            insideBar.style.width = barWidth;
            insideBar.style.height = v * scaling;
            insideBar.classList += k;
            let insideBarSpan = document.createElement("span");
            insideBarSpan.innerHTML = k;
            let insideBarSpanValue = document.createElement("span");
            insideBarSpanValue.classList += "bar_sub--value"
            insideBarSpanValue.innerHTML = v;
            if (v < 4 ){
                let fontSize = (v * scaling)
                if (fontSize < 13) {
                    insideBarSpan.style.fontSize = (v * scaling);
                    insideBarSpanValue.style.fontSize = (v * scaling);
                }
            }
            if (v != 0 ){
                insideBar.appendChild(insideBarSpan);
                insideBar.appendChild(insideBarSpanValue);
                insideBar.classList += " bar_sub";
            }
            bar.appendChild(insideBar);
            className = "." + k
        }
      }

    // mouseover bars
    for (n of nations) {
        let className = "." + n
        u(className).on("mouseover", function() {
            u(className).addClass("highlighted");
          })
    
        u(className).on("mouseout", function() {
            u(className).removeClass("highlighted");
        })
     }
