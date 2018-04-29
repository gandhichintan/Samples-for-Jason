(function () {
    "use strict";
    /**
     * @desc Concept object
     * @returns {Concept} 
     */
    function Concept(){
        
        function Concept(id, name, type, tags) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.tags = [];
            for (var tag in tags) {
                this.tags.push(tags[tag]);
            }
        };
        return Concept;
    }

    angular
        .module("cv.model")
        .factory("Concept", [Concept]);
}());