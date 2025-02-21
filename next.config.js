const { PHRASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (env) => {
	if (env == PHRASE_DEVELOPMENT_SERVER) {
		// adresse en develpoment pr les tests
		return {
			env: {
				MONGODB_CLIENT:
					"mongodb+srv://abouqaysmehdi:9867mnhiUz7Vv0XV@cluster-threads.mel80.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-threads",
				MONGODB_DATABASE: "threads",
				NEXTAUTH_SECRET: "jergejgijgqjqgjgjipekgjqù",
				NEXTAUTH_URL: "http://localhost:3000", //adresse de l'api de login
			},
		};
	}
	//adresse en production
	else {
		return {
			env: {
				MONGODB_CLIENT:
					"mongodb+srv://abouqaysmehdi:9867mnhiUz7Vv0XV@cluster-threads.mel80.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-threads",
				MONGODB_DATABASE: "threads",
				NEXTAUTH_SECRET: "jergejgijgqjqgjgjipekgjqù",
				NEXTAUTH_URL: "http://localhost:3000",
			},
		};
	}
};


// OU

// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// module.exports = (phase) => {
//   const isDev = phase === PHASE_DEVELOPMENT_SERVER;

//   return {
    
//     env: {
//       MONGODB_CLIENT:
//         "mongodb+srv://abouqaysmehdi:9867mnhiUz7Vv0XV@cluster-threads.mel80.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-threads",
//       MONGODB_DATABASE: "threads",
//       NEXTAUTH_SECRET: "jergejgijgqjqgjgjipekgjqù",
//       NEXTAUTH_URL: isDev
//         ? "http://localhost:3000" // URL en développement
//         : "https://localhost:3000", // URL en production
//     },
//   };
// };