//
//  cons.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 9/13/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import Foundation


typealias callback = (_ success: Bool) -> ()
let DEFAULTS_REGISTERED = "isRegistered"
let DEFAULTS_AUTHENTICATED = "isAuthenticated"

let myURL = "http://localhost:3000/api"

let Get_Groups = "\(myURL)/groups"
let Post_Groups = "\(myURL)/groups/add"

let Get_Account = "\(myURL)/account"
let Post_Account = "\(myURL)/account/signup"
let Post_logIn = "\(myURL)/logIn"
let DEFAULTS_EMAIL = "Username"

func return_url(mystring:String)->String{
    return mystring
}

