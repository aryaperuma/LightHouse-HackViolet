lstx=[1,2,3,4,5,6,7]
lstx2=[3,4,5,6]

for i in range(len(lstx)-1):
    for j in range(len(lstx2)):
        if lstx2[j]==lstx[i] and j<len(lstx2)-1 and lstx2[j+1]==lstx[i+1]:
            print(j,j+1)
            print(i,i+1)
            print("a-----------------------------")
            
    
        elif lstx2[j]>=lstx[i] and lstx2[j]<=lstx[i+1]:
            print(j,j+1)
            print(i,i+1)
            print("b-----------------------------")

print("-----------------------------------------------------------------------------------------")

for i in range(len(lstx2)-1):
    for j in range(len(lstx)):
        if lstx[j]==lstx2[i] and j<len(lstx)-1 and lstx[j+1]==lstx2[i+1]:
            print(i,i+1)
            print(j,j+1)
            
            print("c-----------------------------")
            
    
        elif lstx[j]>=lstx2[i] and lstx[j]<=lstx2[i+1]:
            print(i,i+1)
            print(j,j+1)
            
            print("d-----------------------------")

