function Set() {

    // finds the intersection of two lists
    this.intersection = function(listA, listB) {

        var resultList = []; // create a resultList array



        // check for invalid inputs
        if (listA === null || listB === null)
        {
            return null; // exit and return to indicate an error
        }


        // for every element in listA
        for (var i = 0; i < listA.length; i++)
        {
            var nextValue = listA[i]; // get next value in the list

            //for every element in listB
            for (var j = 0; j < listB.length; j++)
            {
                if (listB[j] === nextValue) // this listB element equals nextValue
                {
                    resultList.push(listB[j]); // add listB element to end of resultList
                    break; // break out of (exit) the listB inner loop
                }
            } // end listB inner loop
        } // end listA outer loop

        return resultList;
    }



    this.union = function(listA, listB) {

        var resultList = [];

        // check for invalid inputs
        if (listA === null || listB === null)
        {
            return null; // exit and return to indicate an error
        }

        var resultSet1 = this.relativeComplement(listA, listB);
        var resultSet2 = this.relativeComplement(listB, listA);

        for (var i = 0; i < resultSet1.length; i++)
        {
            resultList.push(resultSet1[i]);
        }

        for (var i = 0; i < resultSet2.length; i++)
        {
            resultList.push(resultSet2[i]);
        }

        for (var i = 0; i < listA.length; i++)
        {
            var nextValue = listA[i]; // get next value in the list

            //for every element in listB
            for (var j = 0; j < listB.length; j++)
            {
                if (listB[j] === nextValue) // this listB element equals nextValue
                {
                    resultList.push(listB[j]); // add listB element to end of resultList
                    break; // break out of (exit) the listB inner loop
                }
            } // end listB inner loop
        } // end listA outer loop



        return resultList;
    }


    this.relativeComplement = function(listA, listB) {

        var resultList = [];


        if (listA === null || listB === null)
        {
            return null; // exit and return to indicate an error
        }

        for (var i = 0; i < listA.length; i++)
        {
            resultList.push(listA[i]);
            var index = resultList.indexOf(listA[i]);
            for (var j = 0; j < listB.length; j++)
            {
                if (listA[i] === listB[j])
                {
                    resultList.splice(index, 1);
                }
            }
        }

        return resultList;
    }



    this.symmetricDifference = function(listA, listB) {

        var resultList = [];

        if (listA === null || listB === null)
        {
            return null; // exit and return to indicate an error
        }

        var resultSet1 = this.relativeComplement(listA, listB);
        var resultSet2 = this.relativeComplement(listB, listA);

        for (var i = 0; i < resultSet1.length; i++)
        {
            resultList.push(resultSet1[i]);
        }

        for (var i = 0; i < resultSet2.length; i++)
        {
            resultList.push(resultSet2[i]);
        }

        return resultList;
    }


}

