/*! uw-db-sqlite - v0.0.2 - 2016-06-02 */function Connection(a,b){this.results=[],this.Client=a,this.end=function(){var b=Q.defer();return a.close(function(a,c){a?(LOG.error(a),b.reject(a)):b.resolve(me.connection)}),b.promise},this.addResult=function(a){this.results.push(a)},this.getLastResult=function(){return this.results[this.results.length-1]}}function SQLite(a){var b=this;b.connection=null,b.open=function(){function c(a){if(a){var b=new Error;b.code=err.code,b.message="Error opening connection.",d.reject(b)}else d.resolve()}var d=Q.defer();return b.connection=new Connection(new sqlite3.Database(a.dbname,c),{}),d.promise};var c=function(a){LOG.debug(a);var c=Q.defer();return b.connection.Client.exec(a,function(a,d){a?(LOG.error(a),c.reject(a)):c.resolve(b.connection)}),c.promise};b.get=function(a,b){},b.getAll=function(a,c){LOG.info(a);var d=Q.defer();return b.connection.Client.all(a,function(a,c){a?(LOG.error(a),d.reject(a)):(b.connection.addResult(c),d.resolve(b.connection))}),d.promise},b.exec=function(a,c){LOG.debug(a);var d=Q.defer();return b.connection.Client.run(a,c,function(a,c){a?(LOG.error(a),d.reject(a)):(b.connection.addResult({lastID:this.lastID,changes:this.changes}),d.resolve(b.connection))}),d.promise},b.begin=function(){return c("BEGIN")},b.commit=function(){return c("COMMIT")},b.rollback=function(){return c("ROLLBACK")},b.end=function(){return LOG.debug("END"),b.connection.end()},b.rollbackAndRelease=function(){return c("ROLLBACK").then(b.end)}}var UTIL=require("util"),sqlite3=require("sqlite3").verbose(),Q=require("q"),MODULE="SQLite",LOG=require("uw-log").newInstance(MODULE);exports.newInstance=function(a){return new SQLite(a)};