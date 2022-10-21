//
//  ContentView.swift
//  GitHubPlayground
//
//  Created by HIROKI IKEUCHI on 2022/10/20.
//

import SwiftUI
import SDWebImageSwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text("Hello, world!")
            Text("Hello, Danger!")
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
