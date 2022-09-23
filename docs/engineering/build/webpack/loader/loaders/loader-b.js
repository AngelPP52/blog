function loader(source) {
    console.log('loader-b');
    console.log('data', this.data);
    return source + 'loader-b'
}
loader.pitch = function (reminningRequest, previousRequest, data) {
    console.log('loader-b-pitch');
    console.log('reminningRequest', reminningRequest);
    console.log('previousRequest', previousRequest);
    data.name = 'loader-b-pitch';
}
module.exports = loader;
