angular.module("cv.model").factory("User",
    [
    function () {
        // TODO review: only use one field for the name, and a nickname
        // http://www.w3.org/International/questions/qa-personal-names#fielddesign
        function User(name, nickname, title, questions, quote, headerText) {
            this.name = name;
            this.nickname = nickname;
            this.email = email;
            this.phone = phone;
            this.address = address;
            //TODO .. add more info, country, city, CP...
        };

        return User;
    }]);