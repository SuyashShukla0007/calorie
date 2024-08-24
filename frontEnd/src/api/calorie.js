const calorie = async () => {
  
const url = 'https://dietagram.p.rapidapi.com/apiFood.php?name=Jab%C5%82ko&lang=pl';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8abde1df3dmsh026af9663e2eaa3p18ff0cjsn52e2426a2d33',
		'x-rapidapi-host': 'dietagram.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

export default calorie;
