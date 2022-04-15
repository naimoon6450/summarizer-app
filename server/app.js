const express = require('express')
const app = express()
const axios = require('axios');
require('dotenv').config();

const ACCESS_TOKEN = ''

app.use(express.json()) // parses request body as json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res, next) => {
    res.send('Hello World')
})

app.post('/summary', (req, res, next) => {
    const sampleText = 'One month after the United States began what has become a troubled rollout of a national COVID vaccination campaign, the effort is finally gathering real steam. Close to a million doses -- over 951,000, to be more exact -- made their way into the arms of Americans in the past 24 hours, the U.S. Centers for Disease Control and Prevention reported Wednesday. That is the largest number of shots given in one day since the rollout began and a big jump from the previous day, when just under 340,000 doses were given, CBS News reported. That number is likely to jump quickly after the federal government on Tuesday gave states the OK to vaccinate anyone over 65 and said it would release all the doses of vaccine it has available for distribution. Meanwhile, a number of states have now opened mass vaccination sites in an effort to get larger numbers of people inoculated, CBS News reported.'
    const sampleText2 = 'Imran was really tired today and wanted to eat food. He doesn\'t like fasting and wishes Ramadan ended sooner rather than later. He never stops working out and needs to eat more. Imran is a good boy and also annoying because he made me make this app.'
    const sampleText3 = 'Physics is one of the oldest academic disciplines and, through its inclusion of astronomy, perhaps the oldest.[6] Over much of the past two millennia, physics, chemistry, biology, and certain branches of mathematics were a part of natural philosophy, but during the Scientific Revolution in the 17th century these natural sciences emerged as unique research endeavors in their own right.[c] Physics intersects with many interdisciplinary areas of research, such as biophysics and quantum chemistry, and the boundaries of physics are not rigidly defined. New ideas in physics often explain the fundamental mechanisms studied by other sciences[3] and suggest new avenues of research in these and other academic disciplines such as mathematics and philosophy. Physics became a separate science when early modern Europeans used experimental and quantitative methods to discover what are now considered to be the laws of physics.[25][page needed] Major developments in this period include the replacement of the geocentric model of the Solar System with the heliocentric Copernican model, the laws governing the motion of planetary bodies (determined by Kepler between 1609 and 1619), Galileo\'s pioneering work on telescopes and observational astronomy in the 16th and 17th Centuries, and Newton\'s discovery and unification of the laws of motion and universal gravitation (that would come to bear his name).[26] Newton also developed calculus,[d] the mathematical study of change, which provided new mathematical methods for solving physical problems.[27] The discovery of new laws in thermodynamics, chemistry, and electromagnetics resulted from greater research efforts during the Industrial Revolution as energy needs increased.[28] The laws comprising classical physics remain very widely used for objects on everyday scales travelling at non-relativistic speeds, since they provide a very close approximation in such situations, and theories such as quantum mechanics and the theory of relativity simplify to their classical equivalents at such scales. However, inaccuracies in classical mechanics for very small objects and very high velocities led to the development of modern physics in the 20th century.'
    
    let userText = req.body.textToSend
    const options = {
        method: 'POST',
        url: 'https://api.nlpcloud.io/v1/bart-large-cnn/summarization',
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN || ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        data: {
            'text': userText === 'sample' || userText === '' ? sampleText3 : userText
        }
    };
    
    console.time('init summarizer');
    axios.request(options).then((response) => {
        let dataObj = response.data
        dataObj['original_text'] = userText === 'sample' || userText === '' ? sampleText3 : userText
        res.json(dataObj)
    }).catch(function (error) {
        res.send(error)
    });

    console.timeEnd('init summarizer');
})

// listen on port
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});