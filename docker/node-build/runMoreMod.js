//使用node 来替换 nginx 的功能,进行多项目在同一域名下开发 使 localStorage,sessionStorage,cookie可共同访问
var liveServer = require("live-server");

var params = {
	port: 8700, // 0 随机端口
	host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
	root: "./public", // Set root directory that's being served. Defaults to cwd.
	open: true, // When false, it won't load your browser by default.
    wait: 30000,
	// mount: [['/components', './node_modules']], // Mount a directory to a route.
	logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
	// middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
    proxy:[
        ['/promod','http://127.0.0.1:8766/promod/'],
        // ['/','http://127.0.0.1:8733/'],
        ['/','http://127.0.0.1:8744'],
    ],
};
liveServer.start(params);