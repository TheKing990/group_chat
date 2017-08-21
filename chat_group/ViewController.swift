//
//  ViewController.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 8/20/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet var userName: UITextField!
    @IBOutlet var passWord: UITextField!
    @IBAction func SummitButton(_ sender: AnyObject) {
        
        print("hey\(userName.text!) \(passWord.text!)")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

