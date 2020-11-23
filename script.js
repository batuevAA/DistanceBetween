window.onload = function() {
    document.getElementById('btn').onclick = function() {
        let sourceFile = document.getElementById('sourceFile'); 
        let firstWord = document.getElementById('firstWord').value; 
        let secondWord = document.getElementById('secondWord').value; 
        
        try {
            let reader = new FileReader(); 
            let file = sourceFile.files[0]
            reader.readAsText(file);

            reader.onload = function() {
                let string = reader.result; 
                let iterator = string.matchAll(new RegExp(/[A-Za-zA-Яа-яё]+/gm));
                let arrayWords = Array.from(iterator); 

                let result = getMinDistance(firstWord, secondWord, arrayWords );

                document.getElementById('result').textContent = result;
                document.getElementById('outputFile').textContent = reader.result;
            }

            reader.onerror = function() {
                console.log('Ошибка при чтени файла: ' + reader.error);
            }
        } catch(err) {
            console.log(err.message);
        }
    }

    function getMinDistance(firstWord, secondWord, words) {
        let minDinstance = null;
        let firstWordIndex = null;
        let secondWordIndex = null;
        console.log(words);

        for (let i = 0; i < words.length; i++) {
            if (words[i] == firstWord) {
                firstWordIndex = i;
            }

            if (words[i] == secondWord) {
                secondWordIndex = i;
            }

            if (firstWordIndex != null && secondWordIndex != null) {
                let distance = Math.abs(firstWordIndex - secondWordIndex);
                if(minDinstance == null || minDinstance > distance) {
                  minDinstance = distance;
                } 
            }
        }
        return minDinstance;
    }
}
