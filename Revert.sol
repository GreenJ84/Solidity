// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

//* Practive revert(), assert(), require()
// Patterns for error handling

    // These methods are error causing

    //! Gas consumed will be lost and everything else returned to sender
    //* Soon to be able to handle error message returns
    contract RevertContract {

        string public state = "initialeState"; 

        function superMethod() public {
            state = "before revert";
            revert();
        }
    }

    //! All gas up to the limit will be consumed/ sent to miners
    contract AssertContract {

        string public state = "initialeState"; 

        function superMethod() public {
            state = "before revert";
            assert( 5 == 4);
            // Pass: assert( 5 == 5);
        }
    }

    //! Assert notation but defaults to revert() upon failure
    // Extra gas returned back to sender
    contract RequireContract {

        string public state = "initialeState"; 

        function superMethod() public {
            state = "before revert";
            require( 5 == 4);
            // Pass: require( 5 == 5);
        }
    }

