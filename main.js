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
            main.innerHTML += `<div class="${who} messages" style="animation: main .7s ease 0s 1 normal forwards;">
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
            window.scrollTo(0, document.body.scrollHeight);
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

