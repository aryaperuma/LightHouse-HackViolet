from map_work import Sector,Node

class Super_Sector:
    def __init__(self,sl_list,el_list,slo_list,elo_list):
        self.all_sectors=[]
        self.No_of_graphs=len(sl_list)
        for i in range(self.No_of_graphs):
            self.all_sectors.append(Sector(sl_list[i],el_list[i],slo_list[i],elo_list[i],i+1))
        for i in range(self.No_of_graphs):
            self.all_sectors[i].create_graph()
            
            
    def give_details(self,lat,lon):
        for i in range(len(self.all_sectors)):
            if lat>=self.all_sectors[i].start_lat and lat<=self.all_sectors[i].end_lat and lon>= self.all_sectors[i].start_longi and lon<=self.all_sectors[i].end_longi:
               return self.all_sectors[i].give_det(lat,lon)
        
    def connect(self):
        leng=len(self.all_sectors)
        for i in range(leng):
            for j in range(leng):
               
                
                
                
                if i!=j:
                    se1=self.all_sectors[i].ret_starts()
                    se2=self.all_sectors[j].ret_starts()
                    
                    sex1,sey1= self.all_sectors[i].ret_coords()
                    sex2,sey2=self.all_sectors[j].ret_coords()
                    
                    
                    if se1[0]>=se2[0] and se1[0]<=se2[2] :

                        
                        if se1[1]==se2[3]:
                            ind_i=0
                            ind_j=self.all_sectors[j].no2-1
                            
                        elif se2[1]==se1[3]:
                            ind_i=self.all_sectors[i].no2-1
                            ind_j=0
                        else:
                            continue

                        print("sub graphs "+self.all_sectors[i].name+" and "+self.all_sectors[j].name+" connecting.....")

                        for ii in range(len(sex1)-1):
                            for jj in range(len(sex2)):
                                if (sex1[ii]==sex2[jj] and jj<len(sex2)-1 and sex1[ii+1]==sex2[jj+1]) or (sex2[jj]>=sex1[ii] and sex2[jj]<=sex1[ii+1]):
                                    if self.all_sectors[i].Matrix[ii][ind_i].dicto.get(self.all_sectors[j].Matrix[jj][ind_j])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[ii][ind_i].dicto[self.all_sectors[j].Matrix[jj][ind_j]]=1
                                        self.all_sectors[i].Matrix[ii][ind_i].neighbours.append(self.all_sectors[j].Matrix[jj][ind_j])
                                    
                                    if self.all_sectors[j].Matrix[jj][ind_j].dicto.get(self.all_sectors[i].Matrix[ii][ind_i])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[jj][ind_j].dicto[self.all_sectors[i].Matrix[ii][ind_i]]=1
                                        self.all_sectors[j].Matrix[jj][ind_j].neighbours.append(self.all_sectors[i].Matrix[ii][ind_i])
                                        
                                        
                        #------------------------------------------------------------------------------------------------------------------    
                        
                        
                        for ii in range(len(sex2)-1):
                            for jj in range(len(sex1)):
                               if (sex1[jj]==sex2[ii] and jj<len(sex1)-1 and sex1[jj+1]==sex2[ii+1]) or (sex2[ii]>=sex1[jj] and sex2[ii]<=sex1[jj+1]):
                                    if self.all_sectors[i].Matrix[jj][ind_i].dicto.get(self.all_sectors[j].Matrix[ii][ind_j])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[jj][ind_i].dicto[self.all_sectors[j].Matrix[ii][ind_j]]=1
                                        self.all_sectors[i].Matrix[jj][ind_i].neighbours.append(self.all_sectors[j].Matrix[ii][ind_j])
                                    
                                    if self.all_sectors[j].Matrix[ii][ind_j].dicto.get(self.all_sectors[i].Matrix[jj][ind_i])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[ii][ind_j].dicto[self.all_sectors[i].Matrix[jj][ind_i]]=1
                                        self.all_sectors[j].Matrix[ii][ind_j].neighbours.append(self.all_sectors[i].Matrix[jj][ind_i])                
                        print("done")
#----------------111111---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    
                    elif se1[2]>=se2[0] and se1[3]<=se2[2] :

                        
                        
                        if se1[1]==se2[3]:
                            ind_i=0
                            ind_j=self.all_sectors[j].no2-1
                            
                        elif se2[1]==se1[3]:
                            ind_i=self.all_sectors[i].no2-1
                            ind_j=0
                        else:
                            continue
                        
                        print("sub graphs "+self.all_sectors[i].name+" and "+self.all_sectors[j].name+" connecting.....")
                        
                        for ii in range(len(sex1)-1):
                            for jj in range(len(sex2)):
                                if (sex1[ii]==sex2[jj] and jj<len(sex2)-1 and sex1[ii+1]==sex2[jj+1]) or (sex2[jj]>=sex1[ii] and sex2[jj]<=sex1[ii+1]):
                                    if self.all_sectors[i].Matrix[ii][ind_i].dicto.get(self.all_sectors[j].Matrix[jj][ind_j])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[ii][ind_i].dicto[self.all_sectors[j].Matrix[jj][ind_j]]=1
                                        self.all_sectors[i].Matrix[ii][ind_i].neighbours.append(self.all_sectors[j].Matrix[jj][ind_j])
                                    
                                    if self.all_sectors[j].Matrix[jj][ind_j].dicto.get(self.all_sectors[i].Matrix[ii][ind_i])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[jj][ind_j].dicto[self.all_sectors[i].Matrix[ii][ind_i]]=1
                                        self.all_sectors[j].Matrix[jj][ind_j].neighbours.append(self.all_sectors[i].Matrix[ii][ind_i])
                                        
                                        
                        #------------------------------------------------------------------------------------------------------------------    
                        
                        
                        for ii in range(len(sex2)-1):
                            for jj in range(len(sex1)):
                               if (sex1[jj]==sex2[ii] and jj<len(sex1)-1 and sex1[jj+1]==sex2[ii+1]) or (sex2[ii]>=sex1[jj] and sex2[ii]<=sex1[jj+1]):
                                    if self.all_sectors[i].Matrix[jj][ind_i].dicto.get(self.all_sectors[j].Matrix[ii][ind_j])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[jj][ind_i].dicto[self.all_sectors[j].Matrix[ii][ind_j]]=1
                                        self.all_sectors[i].Matrix[jj][ind_i].neighbours.append(self.all_sectors[j].Matrix[ii][ind_j])
                                    
                                    if self.all_sectors[j].Matrix[ii][ind_j].dicto.get(self.all_sectors[i].Matrix[jj][ind_i])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[ii][ind_j].dicto[self.all_sectors[i].Matrix[jj][ind_i]]=1
                                        self.all_sectors[j].Matrix[ii][ind_j].neighbours.append(self.all_sectors[i].Matrix[jj][ind_i])                                        
                     
                        print("done")                        
                        
 #-----------------222222222222222222--------------------------------------------------------------------------------------------------------------------------------------------------------------                       
                        
                        
                        
                    elif se1[1]>=se2[1] and se1[1]<=se2[3]:
                        
                        
                        
                        if se1[0]==se2[2]:
                            ind_i=0
                            ind_j=self.all_sectors[j].no1-1
                        elif se2[0]==se1[2]:
                            ind_i=self.all_sectors[i].no1-1
                            ind_j=0
                        else:
                            continue
                        print("sub graphs "+self.all_sectors[i].name+" and "+self.all_sectors[j].name+" connecting.....")
                        
                        for ii in range(len(sex1)-1):
                            for jj in range(len(sex2)):
                                if (sex1[ii]==sex2[jj] and jj<len(sex2)-1 and sex1[ii+1]==sex2[jj+1]) or (sex2[jj]>=sex1[ii] and sex2[jj]<=sex1[ii+1]):
                                    if self.all_sectors[i].Matrix[ind_i][ii].dicto.get(self.all_sectors[j].Matrix[ind_j][jj])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[ind_i][ii].dicto[self.all_sectors[j].Matrix[ind_j][jj]]=1
                                        self.all_sectors[i].Matrix[ind_i][ii].neighbours.append(self.all_sectors[j].Matrix[ind_j][jj])
                                    
                                    if self.all_sectors[j].Matrix[ind_j][jj].dicto.get(self.all_sectors[i].Matrix[ind_i][ii])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[ind_j][jj].dicto[self.all_sectors[i].Matrix[ind_i][ii]]=1
                                        self.all_sectors[j].Matrix[ind_j][jj].neighbours.append(self.all_sectors[i].Matrix[ind_i][ii])
                                        
                                        
                        #------------------------------------------------------------------------------------------------------------------    
                        
                        
                        for ii in range(len(sex2)-1):
                            for jj in range(len(sex1)):
                               if (sex1[jj]==sex2[ii] and jj<len(sex1)-1 and sex1[jj+1]==sex2[ii+1]) or (sex2[ii]>=sex1[jj] and sex2[ii]<=sex1[jj+1]):
                                    if self.all_sectors[i].Matrix[ind_i][jj].dicto.get(self.all_sectors[j].Matrix[ind_j][ii])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[ind_i][jj].dicto[self.all_sectors[j].Matrix[ind_j][ii]]=1
                                        self.all_sectors[i].Matrix[ind_i][jj].neighbours.append(self.all_sectors[j].Matrix[ind_j][ii])
                                    
                                    if self.all_sectors[j].Matrix[ind_j][ii].dicto.get(self.all_sectors[i].Matrix[ind_i][jj])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[ind_j][ii].dicto[self.all_sectors[i].Matrix[ind_i][jj]]=1
                                        self.all_sectors[j].Matrix[ind_j][ii].neighbours.append(self.all_sectors[i].Matrix[ind_i][jj])                                        
                     
                        
                        
                        
                        
                        print("done")                            
 #-------------------3333333333333------------------------------------------------------------------------------------------------------------------------------------------------------------                                               


                        
                    elif se1[3]>=se2[1] and se1[3]<=se2[3]:
                        
                        
                        
                        if se1[0]==se2[2]:
                            ind_i=0
                            ind_j=self.all_sectors[j].no1-1
                        elif se2[0]==se1[2]:
                            ind_i=self.all_sectors[i].no1-1
                            ind_j=0
                        else:
                            continue
                        print("sub graphs "+self.all_sectors[i].name+" and "+self.all_sectors[j].name+" connecting.....")
                        
                        for ii in range(len(sey1)-1):
                            for jj in range(len(sey2)):
                                if (sey1[ii]==sey2[jj] and jj<len(sey2)-1 and sey1[ii+1]==sey2[jj+1]) or (sey2[jj]>=sey1[ii] and sey2[jj]<=sey1[ii+1])!=None:
                                    if self.all_sectors[i].Matrix[ind_i][ii].dicto.get(self.all_sectors[j].Matrix[ind_j][jj]):
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[ind_i][ii].dicto[self.all_sectors[j].Matrix[ind_j][jj]]=1
                                        self.all_sectors[i].Matrix[ind_i][ii].neighbours.append(self.all_sectors[j].Matrix[ind_j][jj])
                                    
                                    if self.all_sectors[j].Matrix[ind_j][jj].dicto.get(self.all_sectors[i].Matrix[ind_i][ii])!=None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[ind_j][jj].dicto[self.all_sectors[i].Matrix[ind_i][ii]]=1
                                        self.all_sectors[j].Matrix[ind_j][jj].neighbours.append(self.all_sectors[i].Matrix[ind_i][ii])
                                        
                                        
                        #------------------------------------------------------------------------------------------------------------------    
                        
                        
                        for ii in range(len(sey2)-1):
                            for jj in range(len(sey1)):
                               if (sey1[jj]==sey2[ii] and jj<len(sey1)-1 and sey1[jj+1]==sey2[ii+1]) or (sey2[ii]>=sey1[jj] and sey2[ii]<=sey1[jj+1]):
                                    if self.all_sectors[i].Matrix[ind_i][jj].dicto.get(self.all_sectors[j].Matrix[ind_j][ii]) !=None:
                                        gh=1
                                    else:
                                        self.all_sectors[i].Matrix[ind_i][jj].dicto[self.all_sectors[j].Matrix[ind_j][ii]]=1
                                        self.all_sectors[i].Matrix[ind_i][jj].neighbours.append(self.all_sectors[j].Matrix[ind_j][ii])
                                    
                                    if self.all_sectors[j].Matrix[ind_j][ii].dicto.get(self.all_sectors[i].Matrix[ind_i][jj]) != None:
                                        gh=1
                                    else:
                                        self.all_sectors[j].Matrix[ind_j][ii].dicto[self.all_sectors[i].Matrix[ind_i][jj]]=1
                                        self.all_sectors[j].Matrix[ind_j][ii].neighbours.append(self.all_sectors[i].Matrix[ind_i][jj])                                        
                     
                        
                        
                        
                        
                        print("done")                            
#---------------------44444444444444444444444----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                        



                      
lstx1=[37.1085,29.9367,21.6379,14.0736,28.1164,29.3878]
lstx2=[29.9367,21.6379,14.0736,7.6575,15.3328,20.8854]
lsty1=[71.4024,67.9747,69.4688,73.9732,81.5098,89.2552]
lsty2=[81.7735,81.5098,81.5098,81.5098,89.2552,97.6048]

total=Super_Sector(lstx1, lstx2, lsty1, lsty2)

total.connect()
