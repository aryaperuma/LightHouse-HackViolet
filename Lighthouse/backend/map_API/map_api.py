from flask import Flask, jsonify, request 
import json
from map_work import Sector
# creating a Flask app 
app = Flask(__name__) 
  
# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 

@app.route('/assign', methods = ['POST']) 
def disp(): 
  
    lat=float(request.form.get('lat'))
    lon=float(request.form.get('lon'))
    ans=sec.give_det(lat,lon)
    name=ans.name
    neigh=[]
    start_lati=ans.start_lat
    end_lati=ans.end_lat
    start_longi=ans.start_longi
    end_longi=ans.end_longi
    for i in range(len(ans.neighbours)):
        neigh.append(ans.neighbours[i].name)
    
    
    return jsonify({'name': name,'neighbours':neigh,'start_lati':start_lati,'end_lat':end_lati,'start_lon':start_longi,'end_lon':end_longi})


@app.route('/det', methods = ['POST']) 
def disp2(): 
  
    name=request.form.get('name')
    print(name)
    ans=sec.give_node_det(name)
    name=ans.name
    neigh=[]
    for i in range(len(ans.neighbours)):
        neigh.append(ans.neighbours[i].name)
    start_lati=ans.start_lat
    end_lati=ans.end_lat
    start_longi=ans.start_longi
    end_longi=ans.end_longi
    
    return jsonify({'name': name,'neighbours':neigh,'start_lati':start_lati,'end_lat':end_lati,'start_lon':start_longi,'end_lon':end_longi})
  
sec=Sector(22.3989,22.7451,88.1531,88.6118,0)
sec.create_graph()

if __name__ == '__main__': 
  
    app.run(debug = True)