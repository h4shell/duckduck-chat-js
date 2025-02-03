const url = "https://duckduckgo.com/duckchat/v1";
const dataset = []

class DuckChat {
    constructor(model, messages) {
        this.model = model;
        this.token = null;
        this.messages = messages;
    }

    async initialize() {
        try {
            const response = await fetch(`${url}/status`, {
                method: 'GET',
                headers: {
                    'x-vqd-accept': '1'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.headers.get('x-vqd-4');
            this.token = data;
        } catch (error) {
            console.error('Errore durante il recupero dello stato:', error);
            this.initialize();
        }
    }

    async sendMessage(message){
        try {
            this.messages.push({ role: "user", content: message });
            const response = await fetch(`${url}/chat`, {
                method: 'POST',
                headers: {
                    'x-vqd-4': this.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: this.messages,
                })
            });
            
            const responseText = await response.text();
            
            try {
                let arrayResponse = responseText.split('\n');
                arrayResponse = arrayResponse.filter(element => element);
                arrayResponse.pop();
                const response = arrayResponse.map((element) => {
                    const row = element.split(': ')[1];
                    return JSON.parse(row);
                })

                const messageResponse = response.map((element) => {
                    return element.message;
                })
                return messageResponse.join('');
            } catch (error) {
                console.error("Failed to parse JSON:", error);
            }
        } catch (error) {
            console.error('Errore durante il recupero dello stato:', error);
        }
    }
}

(async () => {
    const chat = new DuckChat('gpt-4o-mini', dataset);
    await chat.initialize();
    console.log(await chat.sendMessage("mi fai un esempio di fetch in js"));
})();
