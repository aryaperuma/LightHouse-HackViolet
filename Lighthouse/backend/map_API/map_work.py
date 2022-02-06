# -*- coding: utf-8 -*-
"""
Created on Sun May  3 05:03:17 2020

@author: Admin
"""

import math

class Node:
    
    def __init__(self,itr,sl,slo,el,elo):
        self.name=str(itr)
        self.neighbours=[]
        self.start_lat=sl
        self.start_longi=slo
        self.end_lat=el
        self.end_longi=elo
        self.dicto={}        
    

class Sector:
    def __init__(self,sl,el,slo,elo,name):
        
        self.start_lat=min(sl,el)
        self.start_longi=min(slo,elo)
        self.end_lat=max(el,sl)
        self.end_longi=max(elo,slo)
        self.lat_iterator=0.01
        self.longi_iterator=self.longi_km(self.start_lat,self.end_lat)
        self.no1=math.ceil((self.end_lat-self.start_lat)/self.lat_iterator)
        self.no2=math.ceil((self.end_longi-self.start_longi)/self.longi_iterator)
        self.Matrix = [[None for x in range(self.no2)] for y in range(self.no1)]
        self.X_coords=[]
        self.Y_coords=[]
        self.name=str(name)
    
    def longi_km(self,star_lat,end_lat): 
        avg_lat=(star_lat+end_lat)/2
        avg_lat_rad=math.radians(avg_lat)
        deg_longi=math.cos(avg_lat_rad)*111
        km_longi=1/deg_longi
        return round(km_longi,4)    
        
    def create_graph(self):
        cntr=1
        for i in range(self.no1):
            sl=self.start_lat+i*self.lat_iterator
            ter=(self.start_lat+(i+1)*self.lat_iterator)
            if ter>self.end_lat:
                ter=self.end_lat
            el=ter
   
            for j in range(self.no2):
                slo=self.start_longi+j*self.longi_iterator
                ter2=self.start_longi+(j+1)*self.longi_iterator
                if ter2>self.end_longi:
                    ter2=self.end_longi
                elo=ter2
                namee=self.name+"_"+str(cntr)
                self.Matrix[i][j]= Node(cntr,sl,slo,el,elo)
                cntr+=1
        
        for i in range(self.no1):
            for j in range(self.no2):
                lsx=[-1,-1,-1,0,0,1,1,1]
                lsy=[-1,0,1,-1,1,-1,0,1]
        
                for ind in range(8):
                    if i+lsx[ind]>=0 and i+lsx[ind]<self.no1 and j+lsy[ind]>=0 and j+lsy[ind]<self.no2:
                        self.Matrix[i][j].neighbours.append(self.Matrix[i+lsx[ind]][j+lsy[ind]])
                        

        
        self.X_coords.append(round(self.start_lat,4))
        self.Y_coords.append(round(self.start_longi,4))
        
        
        
        for i in range(1,self.no1):
            self.X_coords.append(round(min( self.X_coords[len( self.X_coords)-1]+self.lat_iterator,self.end_lat),4))
        for i in range(self.no2):
             self.Y_coords.append(round(min( self.Y_coords[len( self.Y_coords)-1]+self.longi_iterator,self.end_longi),4))
             
             
        print("graph created..............")

    
    #binary seacr to assign node number    
    
    def give_det(self,lat,lon):
        lst_lat=[]
        lst_lon=[]

        lst_lat.append(round(self.start_lat,4))
        for i in range(self.no1):
            lst_lat.append(round(min(lst_lat[len(lst_lat)-1]+self.lat_iterator,self.end_lat),4))
           

        #print("--------------------------------------------------------")
        
        
        lst_lon.append(round(self.start_longi,4))
        for i in range(self.no2):
            lst_lon.append(round(min(lst_lon[len(lst_lon)-1]+self.longi_iterator,self.end_longi),4))
          
        

        ans=min(range(len(lst_lat)), key = lambda i: abs(lst_lat[i]-lat))
        
        
        ans2=min(range(len(lst_lon)), key = lambda i: abs(lst_lon[i]-lon))
        
        ans_node=self.Matrix[ans][ans2]
        
        return ans_node
        
    def give_node_det(self,name):
        nu=name.split("_")[1]
        num=int(nu)
        num-=1
        xx=int(num/self.no2)
        
        yy=num%self.no2
      
        
        return self.Matrix[xx][yy]
        


 
    def ret_coords(self):
        return self.X_coords,self.Y_coords
    
    
    def ret_starts(self):
        return   self.start_lat,self.start_longi,self.end_lat,self.end_longi
    


#sec=Sector(22.3989,22.7451,88.1531,88.6118)
#sec.create_graph()



#print("Details of some block:-")
#leng=len(sec.Matrix[1][3].neighbours)
#for i in range(leng):
#    print(sec.Matrix[1][3].neighbours[i].name)

#no=sec.give_node_det(112)

#print(no.name)
#leng=len(no.neighbours)
#for i in range(leng):
#    print(no.neighbours[i].name)