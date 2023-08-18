// all messages 
const messages = [
    {"sender" : "user", "message" : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit saepe ex illo amet aliquid iusto.", "time" : 1692279143009},
    {"sender" : "sys", "message" : "Lorem ipsum, dolor sit elit. Impedit saepe ex illo.", "time" : 1692279143019},
    {"sender" : "user", "message" : "adipisicing elit. Impedit saepe ex illo amet aliquid iusto.", "time" : 16922791430010},
]

// get input and send button
const input = document.querySelector('#input_message')
const send_btn = document.querySelector('#send_btn')

// function for show all messages 
function show_messages () {
    messages.forEach(item => {
        main = document.querySelector('main')
        main.innerHTML += `<div class="${item.sender} messages" style="animation: main .7s ease 0s 1 normal forwards;">
            ${item.message} 
            <span class="messages-time">${timeAgo(item.time)}</span>
        </div>`
    })
} show_messages()

// scroll to end of the page (last message)
window.scrollTo(0, document.body.scrollHeight);

// function for get new message
function new_message (who) {
    if (input.value) {
            send_button_animation()
            // remove last message's animation
            document.querySelectorAll('.messages').forEach(item => {
                item.removeAttribute('style')
            })

            main = document.querySelector('main')
            time_of_send = Date.now()
            // show the new message
            main.innerHTML += `<div class="${who} messages" style="animation: main .4s ease 0s 1 normal forwards;">
                ${input.value} 
                <span class="messages-time">${timeAgo(time_of_send)}</span>
            </div>`
            // add message's information in all messages 
            message_info = {
                "sender" : who, 
                "message" : input.value,
                "time" : time_of_send
            }
            messages.push(message_info)
            // ready to get new message
            input.value = ''
            // scrool to end of page 
            window.scroll({
                top: document.body.scrollHeight, 
                left: 0, 
                behavior: 'smooth'
              });
            console.log(document.body.scrollHeight)
    }
}

// handel send button 
send_btn.addEventListener('click', () => {
    // new_message('sys')
    new_message('user')
})

// send message button's animation handeler 
function send_button_animation () {
    send_btn_plane = document.querySelector('#plane')
    send_btn_plane.removeAttribute('style')

    send_btn_plane.setAttribute("style", "animation: send .3s ease 0s 1 normal forwards;")
    setTimeout(() => {
        send_btn_plane.removeAttribute('style')
        send_btn_plane.setAttribute("style", "animation: ready_to_send .3s ease 0s 1 normal forwards;")
    }, 250);
}



// return what time ago 
function timeAgo(someDateInThePast) {
    let result = '';
    let difference = Date.now() - someDateInThePast;

    if (difference < 5 * 1000) {
        return 'just now';
    } else if (difference < 90 * 1000) {
        return 'moments ago';
    }

    if ((difference % 1000 * 3600) > 0) {
        if (Math.floor(difference / 1000 / 60 % 60) > 0) {
            let s = Math.floor(difference / 1000 / 60 % 60) == 1 ? '' : 's';
            result = `${Math.floor(difference / 1000 / 60 % 60)} minute${s} `;
        }
    }

    if ((difference % 1000 * 3600 * 60) > 0) {
        if (Math.floor(difference / 1000 / 60 / 60 % 24) > 0) {
            let s = Math.floor(difference / 1000 / 60 / 60 % 24) == 1 ? '' : 's';
            result = `${Math.floor(difference / 1000 / 60 / 60 % 24)} hour${s}${result == '' ? '' : ','} ` + result;
        }
    }

    if ((difference % 1000 * 3600 * 60 * 24) > 0) {
        if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
            let s = Math.floor(difference / 1000 / 60 / 60 / 24) == 1 ? '' : 's';
            result = `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s}${result == '' ? '' : ','} ` + result;
        }
    }
    return result + ' ago';
}


// animation handeler for change dark mood button's icon
function dark_mood_animation (sun_or_moon) {
    dark_mood_icon = document.querySelector('#dark_mood_icon')
    dark_mood_icon.removeAttribute('style')
    if (sun_or_moon == "sun"){
        dark_mood_icon.src = "./other/moon.svg"
    } else {
        dark_mood_icon.src = "./other/sun.png"
    }

    dark_mood_icon.setAttribute("style", "animation: moon .3s ease 0s 1 normal forwards;")
    setTimeout(() => {
        dark_mood_icon.removeAttribute('style')
        if (sun_or_moon == "sun"){
            dark_mood_icon.src = "./other/sun.png"
        } else {
            dark_mood_icon.src = "./other/moon.svg"
        }
        dark_mood_icon.setAttribute("style", "animation: sun .3s ease 0s 1 normal forwards;")
    }, 100);
}

// function for handel dark mood 
let flag = true
function dark_mood () {
    if (flag) {
        // dark mood to light mood 
        document.documentElement.style.cssText = `
            --main-color : #fafafa;
            --text-color : #2d2d2d;
            --user-message-text-color : #fafafa;
            --opacity_color : #e2e2e2;
            --gradient-them : linear-gradient(to right, #00aede, #0072ff);
            --gradient-main : linear-gradient(164deg, rgb(250, 250, 250) 0%, #fafafa 35%, #a8d9e6 100%);`;

        // change footer to light mood
        document.querySelector('footer').id = 'footer_light'
        // change dark mood icon with animation
        dark_mood_animation("sun")
        // change meta them color's value 
        document.querySelector('#meta_them_color').content = "#fafafa"
    } else {
        // light mood to dark mood
        document.documentElement.style.cssText = `
            --main-color : #00001c;
            --text-color : #fafafadd;
            --user-message-text-color : #fafafa;
            --opacity_color : #58585857;
            --gradient-them : linear-gradient(to right, #00aede, #0072ff);
            --gradient-main : linear-gradient(164deg, #000000 0%, #00001c 35%, #002136 100%);`;
        
        // change footer to dark mood
        document.querySelector('footer').id = 'footer_dark'
        // change dark mood icon with animation
        dark_mood_animation("moon")
        // change meta them color's value 
        document.querySelector('#meta_them_color').content = "#00001c"
    }
}
// dark_mood()
document.querySelector('#dark_mood_btn').addEventListener ('click', (enevt) => {
    dark_mood()
    if (flag) {
        flag = false
    } else {
        flag = true
    }
})
